var express = require('express');
var router = express.Router();

var db = require('../queries/clients-queries');

router.get('/', db.getAllClients);
router.get('/:username', db.getSingleClient);
router.get('/:cid/favorites', db.getClientFavorites);
router.get('/:cid/memberships', db.getClientMemberships);
router.get('/:cid/favorites', db.getClientFavorites);
router.get('/:cid/payments', db.getClientPayments);
router.get('/:cid/payments/:paymentid', db.getClientPayment);
router.get('/:cid/paymentmethod', db.getClientPaymentMethod);
router.post('/:cid/favorites', db.addFavorite);
router.post('/:cid/payments', db.addPayment);
router.delete('/:cid/favorites/:fav_id', db.removeFavorite);

module.exports = router;
