const clothModel = require("../models/clothesSchema");
const mongoose = require("mongoose");

// new collections
const productsModel = require("../models/productSchema");
const productDetails = require("../models/productDetails");

// update in nested array using $
const buyProducts = async (req, res) => {
  const { pId, size, colour } = req.body;
  if (!size || !colour) {
    return res.json({ message: "Please send valid size or colour" });
  }
  //   console.log("data", id, size, colour);
  if (!mongoose.Types.ObjectId.isValid(pId)) {
    return res.status(400).json({ error: "Invalid Product ID sent!" });
  }
  const idToSearch = new mongoose.Types.ObjectId(`${pId}`);
  try {
    const data = await clothModel.updateOne(
      {
        _id: idToSearch,
      },
      { $inc: { "moreDetails.$[clothSize].details.$[pDetail].quantity": -1 } },
      {
        arrayFilters: [
          { "clothSize.size": size },
          { "pDetail.colour": colour, "pDetail.quantity": { $gt: 0 } },
        ],
        new: true,
      }
    );
    // console.log(data);
    if (!data.matchedCount) return res.json({ message: "Product not found" });
    else if (data.modifiedCount > 0)
      res.json({ success: true, message: "Product is successfully ordered!" });
    else res.json({ success: false, message: "Product is outofstock!" });
  } catch (err) {
    console.log("Error Checking the quantity: ", err);
  }
};

// find products data having nested array
const getproducts = async (req, res) => {
  const products = await clothModel.find({});
  //    console.log(data);
  res.json({ products });
};

// get data from 2 collection by populating
const getProducts = async (req, res) => {
  const products = await productsModel.find({}).populate("moreDetails");
  console.log("getproductsData", products);
  res.json({ products });
};

// place order
const placeOrder = async (req, res) => {
  const { pId, colour, size } = req.body;
  if (!size || !colour) {
    return res.json({ message: "Please send valid size or colour" });
  }
  //   console.log("data", id, size, colour);
  if (!mongoose.Types.ObjectId.isValid(pId)) {
    return res.status(400).json({ error: "Invalid Product ID sent!" });
  }
  const idToSearch = new mongoose.Types.ObjectId(`${pId}`);
  try {
    const dataToUpdate = await productsModel.aggregate([
      { $match: { _id: idToSearch } },
      { $unwind: "$moreDetails" },
      {
        $lookup: {
          from: "productdetails",
          localField: "moreDetails",
          foreignField: "_id",
          as: "detailsOfProduct",
        },
      },
      { $unwind: "$detailsOfProduct" },
      { $replaceRoot: { newRoot: "$detailsOfProduct" } },
      { $match: { size: size } },
    ]);
    // .populate("moreDetails");
    // console.log("po",dataToUpdate[0]._id);
    const updateQuantity = await productDetails.findOneAndUpdate(
      { _id: dataToUpdate[0]._id ,"details.colour": colour },
      {
        $inc: { "details.$.quantity": -1 },
      },
      { new: true }
    );
    // ;
    console.log(updateQuantity);
  } catch (err) {
    console.log("Error Placing order : ", err);
  }
};

module.exports = {
  buyProducts,
  getProducts,
  getproducts,
  placeOrder,
};
