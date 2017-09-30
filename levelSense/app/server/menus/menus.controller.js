var fs = require("fs");
var menus = require("./menus.model"); // Menu database storage

const uniqueID = "0000";

// Adds menu item
module.exports.addMenuItem = function (req, res) {
	var name = req.body.name;
	var price = req.body.price;
	var isPromo = req.body.isPromo;
	var isSides = req.body.isSides;
	var isBvg = req.body.isBvg;
	
	// Checks for duplicate menu item names before adding
	menus.findOneAndUpdate(
		{ uniqueID: uniqueID,
		"menu.name": { $ne: name } },
		{ $push: { menu: {
			name: name,
			price: price,
			isPromo: isPromo,
			isSides: isSides,
			isBvg: isBvg,
			qty: 0,
			comment: "",
		 	img: { data: fs.readFileSync(req.body.img), contentType: "image/png"}} }
		}, { new: true },
		function (err, doc) {
			if (err) return res.json(err);
			else if(doc == null) {
				res.json({
					"code": 10,
					"result": "Unsuccessful, duplicate Menu Item: " + name
				});
			} else {
				res.json({
					"code": 0,
					"result": "Successfully added new Menu Item: " + name
				});
			}
		}
	);
};

// Changes menu name
module.exports.changeMenuItemName = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var currName = req.body.currName;
	var newName = req.body.newName;

	if(currName == newName) {
		res.json({
			"code": 20,
			"result": "Identical names"
		});
	} else {
		menus.update({
			"uniqueID": uniqueID,
		 	"menu.name": currName },
			{"menu.$.name": newName },
			function(err) {
				if(err) return res.json(err);
				res.json({
					"code": 0,
					"result": "Successfully changed the following Menu Item: " + currName
									+ ", New Menu Item Name: " + newName
				});
			}
		);
	}
};

// Changes menu item price
module.exports.changeMenuItemPrice = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var name = req.body.name;
	var newPrice = req.body.newPrice;

	menus.update({
		"uniqueID": uniqueID,
	 	"menu.name": name },
		{"menu.$.price": newPrice },
		function(err) {
			if(err) return res.json(err);
			res.json({
				"code": 0,
				"result": "Successfully changed the following Menu Item: " + name
								+ ", new price: " + newPrice
			});
		}
	);
};

// Changes menu item promotion
module.exports.changeMenuItemIsPromo = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var name = req.body.name;
	var newIsPromo = req.body.newIsPromo;

	menus.update({
		"uniqueID": uniqueID,
	 	"menu.name": name },
		{"menu.$.isPromo": newIsPromo },
		function(err) {
			if(err) return res.json(err);
			res.json({
				"code": 0,
				"result": "Successfully changed the following Menu Item: " + name
								+ ", new promotion value: " + newIsPromo
			});
		}
	);
};

// Deletes menu item
module.exports.deleteMenuItem = function (req, res) {
	var uniqueID = req.body.uniqueID;
	var name = req.body.name;

	menus.update({ "uniqueID": uniqueID },
		{$pull: { menu: { name: name } } },
		{ multi: false },
		function(err) {
			if(err) return res.json(err);
			res.json({
				"code": 0,
				"result": "Successfully deleted the following Menu Item: " + name
			});
		}
	);
};

// Retrieves menu when there is a HTTP request
module.exports.getMenu = function (req, res) {
	var uniqueID = req.params.uniqueID;

	menus.find({uniqueID: uniqueID}, function (err, menus) {
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

// Adds default restaurant menu if the database is empty
(function defaultMenu() {
	menus.count({}, function(err, count) {
		if(count == 0) {
			var newMenu = new menus({uniqueID: uniqueID});
			newMenu.save(function (err) {
				if (err) return res.json(err);
				console.log("Default restaurant menu sucessfully added!");
			});
		}
	});
})();
