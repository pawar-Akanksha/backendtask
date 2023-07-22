const express = require("express");

const router = express.Router();

const authenticateToken = require("../middelware/authenticateToken");
const rolesMiddleware = require("../middelware/roleMiddelware");

const {createProduct} = require("../controllers/Product");
const {getProducts,updateProduct,deleteProduct} = require("../controllers/Product");
const{userRagister,userLogin} = require("../controllers/User")

// Middleware to authenticate users (Bearer authentication)
router.use(authenticateToken);

// registeration for both role user and admin
router.post("/register",userRagister);

// login for both user and admin

router.post("/login",userLogin);

// Route to create a new product (restricted to 'admin' role)
router.post('/products', rolesMiddleware('admin'), createProduct);

// Route to get list of products (no specific role restriction)
router.get('/products', getProducts);

// Route to update a product (restricted to 'admin' role)
router.put('/products/:productId', rolesMiddleware('admin'), updateProduct);

// Route to delete a product (restricted to 'admin' role)
router.delete('/products/:productId', rolesMiddleware('admin'), deleteProduct);

module.exports = router;