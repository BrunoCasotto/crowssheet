let AuthService = require('@modules/authentication/service')
let data = 'test'

class Injector {

	get data () {
        return data
    }

	set data (data) {
		data = data
	}

} module.exports = new Injector()
