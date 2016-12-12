var express = require('express');
var router = express.Router();

var db = require('../queries/clients-queries');

router.get('/clients', db.getAllClients);
router.get('/clients/:username', db.getSingleClient);
router.get('/clients/:cid/favorites', db.getClientFavorites;
router.delete('/clients/:cid/favorites/:fav_id', db.removeFavorite);

module.exports = router;
