import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Fetch all the products
//@route  Get/api/products
//@access  Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc Fetch signle products
//@route  Get/api/products/:id
//@access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Delete product
//@route  DELETE/api/products/:id
//@access  Public/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }
  await Product.deleteOne({ _id: product.id });
  res.json({ message: "Product removed" });
});

//@desc create product
//@route  Post/api/products
//@access  Public/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    Name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/product_05.jpg",
    category: "food",
    countInstock: 0,
    numberofreviews: 0,
    description: "discription",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
//@desc update product
//@route  PUT/api/products/:id
//@access  Public/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    Name,
    price,
    user,
    image,
    category,
    countInstock,
    numberofreviews,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.Name = Name;
    product.price = price;
    product.user = user;
    product.image = image;
    product.category = category;
    product.countInstock = countInstock;
    product.numberofreviews = numberofreviews;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
