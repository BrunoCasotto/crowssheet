// let AuthService = require('@modules/authentication/service')

class Injector {

	constructor() {
		this._data = {}
	}

	get data () {
		return this._data
	}

	set data (data) {
		this._data = data
	}

} module.exports = new Injector()
