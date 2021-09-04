const express = require('express')
const router = express.Router();



const { newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/product_controller');

// router.get('/get_users', (req, res) => {
//     res.send("This is a get users route");
//     console.log("This is a users route");
// })



router.route('./product/new').post(newProduct);

router.route('./product/:id').get(getSingleProduct);

router.route('./product/:id').put(updateProduct);

router.route('./product/:id').delete(deleteProduct);


module.exports = router;