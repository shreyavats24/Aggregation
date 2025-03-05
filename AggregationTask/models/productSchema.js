// Task 2 - break the nested array in two tables (products , productsDetails)
const mongoose = require("mongoose");
// connection with mongoDB
mongoose
  .connect("mongodb://localhost:27017/ClothStore")
  .then(() => {
    console.log("MongoDB is connected !!");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB!", err);
  });

// clothes schema
const products = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    default: 100,
  },
  moreDetails: [
    { type: mongoose.Schema.Types.ObjectId, ref: "productdetails" },
  ],
  productImage: {
    type: String,
  },
});

const productsModel = mongoose.model("products", products);
module.exports = productsModel;
