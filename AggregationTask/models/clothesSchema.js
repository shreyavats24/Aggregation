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
const ClothesDetails = new mongoose.Schema({
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
    {
      size: { type: String},
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
    },
  ],
  productImage: {
    type: String,
  },
});

const ClothsModel = mongoose.model("ClothesDetails", ClothesDetails);
module.exports = ClothsModel;
