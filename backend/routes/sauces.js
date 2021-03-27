const express = require('express');
const Sauce = require('../models/sauces');
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const sauceRouter = express.Router();

sauceRouter.get('/', auth, sauceCtrl.getAllSauces);
sauceRouter.post('/', auth, multer, sauceCtrl.createSauce);
sauceRouter.post('/:id/like', auth, sauceCtrl.likeSauce);
sauceRouter.get('/:id', auth, sauceCtrl.getOneSauce);
sauceRouter.put('/:id', auth, multer, sauceCtrl.modifySauce);
sauceRouter.delete('/:id', auth, sauceCtrl.deleteSauce);

  
module.exports = sauceRouter;