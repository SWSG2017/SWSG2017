var express = require('express');
var ctrl = require('./menus.controller');
var router = express.Router();

router.post('/addMenuItem', ctrl.addMenuItem);
router.post('/changeMenuItemName', ctrl.changeMenuItemName);
router.post('/changeMenuItemPrice', ctrl.changeMenuItemPrice);
router.post('/changeMenuItemIsPromo', ctrl.changeMenuItemIsPromo);
router.post('/deleteMenuItem', ctrl.deleteMenuItem);
router.get('/:uniqueID', ctrl.getMenu);

module.exports = router;
