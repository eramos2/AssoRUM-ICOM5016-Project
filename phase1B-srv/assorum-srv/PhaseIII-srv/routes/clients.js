var express = require('express');
var router = express.Router();

var db = require('../queries/clients-queries');

router.get('/', db.getAllClients);
router.get('/:username', db.getSingleClient);
router.get('/:cid/favorites', db.getClientFavorites);
router.post('/', db.createClient);
router.put('/:cid/paymentmethod', db.updatePaymentMethod);
router.post('/:cid/memberships', db.addMembership);
router.post('/:cid/payments', db.makePayment);
router.delete('/:cid/favorites/:fav_id', db.removeFavorite);

module.exports = router;
