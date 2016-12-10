let request = require("request")
let firebase = require('firebase')
let config = require('@config/database')

let gcloud = require('gcloud')({
  projectId: 'blog-9d0bc'
})

const firebaseApp = firebase.initializeApp(config)

class Firebase {
	constructor() {
        console.log(config)
		this._base_path = ''
		this.create_rules = {}
		this._firebase = firebaseApp
		this.cloud = gcloud
	}

    get database () {
        return this._firebase.database()
    }

    get auth () {
        return this._firebase.auth()
    }

    _path (p) {
        if (p) {
            return `${this._base_path}/${p}`
        } else {
            return this._base_path
        }
    }
}
module.exports = Firebase
