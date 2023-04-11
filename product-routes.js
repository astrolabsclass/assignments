const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel.js');

router.post(
    '/create-product',
    function(req, res) {

        const newDocument = {
            "productName": req.body.productName,
            "productModel": req.body.productModel,
            "price": req.body.price,
            "properties": req.body.properties,
        }


        ProductModel
        .create(newDocument)
        .then(
            function(newlyCreatedDocument) {
                res.send({
                    "status": "ok",
                    "message": newlyCreatedDocument
                })
            }
        )
        .catch(
            function(dbError) {
                res.json({
                    "status": "not ok",
                    "message": "Error at /register"
                })
            }
        )

    }
);

module.exports = router;