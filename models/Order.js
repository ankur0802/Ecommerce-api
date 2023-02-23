const mongoose = require("mongoose");
const Product = require('./Product');
const User = require('./User');

const orderSchema = new mongoose.Schema(
  {
    userId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'User' , unique: true },
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);