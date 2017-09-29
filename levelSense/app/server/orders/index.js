var express = require('express');
var ctrl = require('./orders.controller');
var router = express.Router();

router.post('/updateOrder', ctrl.updateOrder);

module.exports = router;
