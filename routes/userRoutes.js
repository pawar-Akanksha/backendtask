const express = require("express");

const router = express.Router();

const authenticateToken = require("../middelware/authenticateToken");
const rolesMiddleware = require("../middelware/roleMiddelware");
const productController = require("../controllers/Product");

// Middleware to authenticate users (Bearer authentication)
router.use(authMiddleware);


// Route to create a new product (restricted to 'admin' role)
router.post('/products', rolesMiddleware('admin'), productController.createProduct);

// Route to get list of products (no specific role restriction)
router.get('/products', productController.getProducts);

// Route to update a product (restricted to 'admin' role)
router.put('/products/:productId', rolesMiddleware('admin'), productController.updateProduct);

// Route to delete a product (restricted to 'admin' role)
router.delete('/products/:productId', rolesMiddleware('admin'), productController.deleteProduct);

module.exports = router;