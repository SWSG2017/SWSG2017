var mongoose = require("mongoose");

var order = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	},
	isPromo: {
		type: Boolean,
		required: true
	},
	isSides: {
		type: Boolean,
		required: true
	},
	isBvg: {
		type: Boolean,
		required: true
	},
	qty: {
		type: Number
	},
	comment: {
		type: String
	}
}, { _id: false });

var allRestOrdersSchema = mongoose.Schema({
	uniqueID: {
		type: String,
		required: true,
		unique: true
	},
	restOrders: {
		type: [order]
	}
});

module.exports = mongoose.model("Orders", allRestOrdersSchema);
