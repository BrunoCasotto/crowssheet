let home = require("@module/home/controller")
let controller = new home();

module.exports = [
	{ method: 'GET', path: '/', handler: controller.index}
]