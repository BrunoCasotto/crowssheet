let routes = require('./home')
	.concat(require('./authentication'))
	.concat(require('./post'))
	.concat(require('./dashboard'))
	.concat(require('./static'))
module.exports = routes