const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true }
});

const productSchema = new Schema({
  imagePath: { type: String },
  category: { type: String, required: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  seller: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

// exporting a model
const Product = model("Product", productSchema);
const User = model("User", userSchema);

module.exports = {
  Product,
  User
};
