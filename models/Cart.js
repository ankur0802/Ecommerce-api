const mongoose = require("mongoose");
const Product = require('./Product');
const User = require('./User');

const cartSchema = new mongoose.Schema(
  {
    userId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'User' , unique: true},
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required:true,
          unique: true,
          ref: "Product"
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);