var express = require('express');
var router = express.Router();

var db = require('../queries/clients-queries');

router.get('/', db.getAllClients);
router.get('/:username', db.getSingleClient);
router.get('/:cid/favorites', db.getClientFavorites);
router.delete('/:cid/favorites/:fav_id', db.removeFavorite);

module.exports = router;
