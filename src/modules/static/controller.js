let homeService = require("@modules/home/service")
let postService = require("@modules/post/service")
let jsonQuery = require('json-query')

class StaticController {

	showProgramming(request, reply) {
		reply.view('pages/statics/programming',{tema: "pratique o amor"})
	}

	showRadio(request, reply) {
		reply.view('pages/statics/radio')
	}
}

module.exports = StaticController
