// controllers/productController.js

const Product = require('../modules/ProductModel');

// Create a new product
module.exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get list of products with filtering and pagination
module.exports.getProducts = async (req, res) => {
  const { category, price, name, page, limit } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (priceBand) filter.price = { $lte: priceBand };
  if (name) filter.name = { $regex: name, $options: 'i' };

  try {
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a product
module.exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product
module.exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
