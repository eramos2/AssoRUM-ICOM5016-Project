var express = require('express');
var router = express.Router();

var db = require('../queries/clients-queries');

router.get('/', db.getAllClients);
router.get('/:username', db.getSingleClient);
router.get('/:cid/favorites', db.getClientFavorites);
router.post('/:cid/favorites/:eid', db.addFavorite);
router.post('/', db.createClient);
router.get('/:cid/memberships', db.getClientMemberships);
router.get('/:cid/paymentmethod', db.getPaymentMethod);
router.put('/:cid/paymentmethod', db.updatePaymentMethod);
router.post('/:cid/memberships/:mbspid', db.addMembership);
router.post('/:cid/payments/', db.makePayment);
router.delete('/:cid/favorites/:fav_id', db.removeFavorite);
router.delete('/:cid', db.deleteClient);

module.exports = router;
