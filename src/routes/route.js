let routes = require("@modules/home/routes")
	.concat(require("@modules/authentication/routes"))
	.concat(require("@modules/admin/dashboard/routes"))
	.concat(require("@modules/static/routes"))
	.concat(require("@modules/course/routes"))
module.exports = routes