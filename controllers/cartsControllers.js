const Cart = require("../models/Cart");
const Product = require("../models/Product");

// create 

exports.createCart = async (req, res) => {
    try {
      const newCart = new Cart(req.body);
      
      const selectedProduct = await Product.findById(req.body.products[0].productId);
      if(!selectedProduct) return res.status(400).send("Invalid Product");

      if(req.body.products[0].quantity > selectedProduct.quantity)
      return res.status(400).send('Enter quantity ih higher than present stock');

      const savedCart = await newCart.save();

      if(selectedProduct.quantity > 0 ){
        Product.findOneAndUpdate({_id: req.body.products[0].productId}, {$inc: {quantity: -newCart.products[0].quantity}}, (err, updateData)=>{});
      }else{

        return res.status(400).send("Product not in stock");
      }
      
      res.status(200).send(savedCart);
      
    } catch (err) {
      res.status(500).send(err.message);
    }
    };

 // update 

exports.updateCart = async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).send(updatedCart);
    } catch (err) {
      res.status(500).send(err);
    }
  };


// delete 

exports.deleteCart = async (req, res) => {
    try {


      const deletedCart = await Cart.findById(req.params.id);
   
      const incquantity = await deletedCart.products[0].quantity;

        Product.findOneAndUpdate({_id: deletedCart.products[0].productId}, {$inc: {quantity: incquantity}}, (err, updateData)=>{});

      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).send("Cart has been deleted...");
    } catch (err) {
      res.status(500).send(err.message);
    }
  };


  //GET USER CART
exports.getUserCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).send(cart);
    } catch (err) {
      res.status(500).send(err);
    }
  };

// get all 
exports.getallCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
}

