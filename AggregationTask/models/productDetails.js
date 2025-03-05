const mongoose = require("mongoose");

const productdetails = new mongoose.Schema({
  size: { type: String },
  details: [
    {
      quantity: {
        type: Number,
        default: 0,
        min: 0,
      },
      colour: { type: String },
    },
  ],
});
const detailsModel = mongoose.model("productdetails", productdetails);
module.exports = detailsModel;
