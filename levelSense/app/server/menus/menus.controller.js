var fs = require("fs");
var Menus = require("./menus.model"); // Menu database storage

const uniqueID = "0000";

// Add menu items
module.exports.addMenuItem = function (req, res) {
	var name = req.body.name;
	var price = req.body.price;
	var isPromo = req.body.isPromo;
	var isSides = req.body.isSides;
	var isBvg = req.body.isBvg;

	Menus.findOneAndUpdate(
		{ uniqueID: uniqueID },
		{ $push: { menu: {
			name: name,
			price: price,
			isPromo: isPromo,
			isSides: isSides,
			isBvg: isBvg,
			qty: 0,
			comment: "" } }
		}, { new: true },
		function (err) {
			if (err) return res.json(err);
			res.json({
				"code": 0,
				"result": "Successfully added new Menu Item: " + name
			});
		}
	);
};

// Change menu name
module.exports.changeMenuItemName = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var currName = req.body.currName;
	var newName = req.body.newName;

	if(oldLocation == newLocation) {
		res.json({
			"code": 20,
			"result": "Identical names"
		});
	} else {
		Menus.update({
			"uniqueID": uniqueID,
		 	"menu.name": currName },
			{"menu.$.name": newName },
			function(err) {
				if(err) return res.json(err);
				res.json({
					"code": 0,
					"result": "Successfully changed the following Menu Item " + currName
									+ ", New Menu Item Name: " + newName
				});
			}
		);
	}
};

// Change menu item price
module.exports.changeMenuItemPrice = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var name = req.body.name;
	var newPrice = req.body.newPrice;

	Menus.update({
		"uniqueID": uniqueID,
	 	"menu.name": name },
		{"menu.$.price": newPrice },
		function(err) {
			if(err) return res.json(err);
			res.json({
				"code": 0,
				"result": "Successfully changed the following Menu Item " + name
								+ ", new price: " + newPrice
			});
		}
	);
};

// Change menu item promotion
module.exports.changeMenuItemIsPromo = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var name = req.body.name;
	var newIsPromo = req.body.newIsPromo;

	Menus.update({
		"uniqueID": uniqueID,
	 	"menu.name": name },
		{"menu.$.isPromo": newIsPromo },
		function(err) {
			if(err) return res.json(err);
			res.json({
				"code": 0,
				"result": "Successfully changed the following Menu Item " + name
								+ ", new promotion value: " + newIsPromo
			});
		}
	);
};

// Delete menu item
module.exports.deleteMenuItem = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var name = req.body.name;

	Menus.update({ "uniqueID": uniqueID },
		{$pull: { menu: { name: name } } },
		{ multi: false },
		function(err) {
			if(err) return res.json(err);
			res.json({
				"code": 0,
				"result": "Successfully deleted the following Menu Item " + name
			});
		}
	);
};

// Retrieve menu when there is a HTTP request
module.exports.getMenu = function (req, res) {
	var uniqueID = req.params.uniqueID;

	Menus.find({uniqueID: uniqueID}, function (err, menus) {
		if (err) return res.json(err);
		menu = menus.map(function (menu) {
			return {
				uniqueID: menu.uniqueID,
				menu: sortResult(menu.menu)
			};
		});

		res.json({
			"result": menu
		});
	});
};

// Sort menu items based on name
var sortResult = function(menuItems) {
	menuItems.sort(function (a, b) {
		return a.name.localeCompare(b.name);
	});
	return menuItems;
};

// Adds default restaurant if the database is empty
(function defaultMenu() {
	Menus.count({}, function(err, count) {
		if(count == 0) {
			var newMenu = new Menus({uniqueID: uniqueID});
			newMenu.save(function (err) {
				if (err) return res.json(err);
				console.log("Default restaurant menu sucessfully added!");
			});
		}
	});
})();
