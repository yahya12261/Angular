const express = require('express');
const router = express.Router();
const imagesController = require('../Controllers/imagesController')
router.route('/:id')
.get(imagesController.getProductImageById)



module.exports = router;