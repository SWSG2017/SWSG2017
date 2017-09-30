var mongoose = require("mongoose");

var menuItems = mongoose.Schema({
	name: {
		type: String,
		required: true
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
	},
	img: {
		data: Buffer,
		contentType: String
	}
}, { _id: false });

var menusSchema = mongoose.Schema({
	uniqueID: {
		type: String,
		required: true,
		unique: true
	},
	menu: {
		type: [menuItems]
	}
});

module.exports = mongoose.model("Menus", menusSchema);
