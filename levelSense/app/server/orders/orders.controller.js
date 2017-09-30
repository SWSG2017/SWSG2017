var fs = require('fs');
var allRestOrders = require('./orders.model'); // Order database storage

const uniqueID = "0000";

// Update stock
module.exports.updateOrder = function (req, res) {
	var order = [];

	req.body.result.forEach(function(item) {
		order.push(item);
	});
	console.log(order);

	allRestOrders.findOneAndUpdate(
		{ uniqueID: uniqueID },
		{ $push: { restOrders: {
			order: order } }
			}, { new: true },
			function (err) {
				if (err) return res.json(err);
				res.json({
				"code": 0,
				"result": "Successfully added new Restaurant Order"
			});
		}
	);
};

// Adds default restaurant order if the database is empty
(function defaultRestOrder() {
	allRestOrders.count({}, function(err, count) {
		if(count == 0) {
			var newRestOrders = new AllRestOrders({uniqueID: uniqueID});
			newRestOrders.save(function (err) {
				if (err) return res.json(err);
				console.log("Default restaurant orders sucessfully added!");
			});
		}
	});
})();
