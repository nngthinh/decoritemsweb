const express = require("express");

const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const checkManager = require('../middleware/check-manager');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/addproduct", 
//checkManager, 
upload.single('productImage'), ProductsController.products_create_product);

router.patch("/:productId", 
//checkManager, 
ProductsController.products_update_product);

router.delete("/:productId", 
//checkManager, 
ProductsController.products_delete);

router.get("/", 
//checkAuth, 
ProductsController.products_get_all);

router.get("/:productId", 
//checkAuth, 
ProductsController.products_get_product);

module.exports = router;
