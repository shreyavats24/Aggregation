const clothModel = require("../models/clothesSchema");
const mongoose = require("mongoose");

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

const getproducts = async (req, res) => {
  const products = await clothModel.find({});
  //    console.log(data);
  res.json({ products });
};
module.exports = {
  buyProducts,
  getproducts,
};
