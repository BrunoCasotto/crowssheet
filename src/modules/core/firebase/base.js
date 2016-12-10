
import firebase from 'firebase'
import Validator from 'validatorjs'
import moment from 'moment'
import {config} from './../../config'

const firebaseApp = firebase.initializeApp(config)

class Firebase {

    constructor () {
        this._base_path = ''
        this._firebase = firebaseApp
        this.create_rules = {}
    }

    onceVal (path = null) {
        return this.database.ref(this._path(path)).once('value')
    }

    onVal (callback, path = null) {
        this.database.ref(this._path(path)).on('value', result => {
            callback(result)
        })
    }

    push (data) {
        let validation = new Validator(data, this.create_rules)

        data.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

        if (validation.fails()) {
            return new Promise( (resolve, reject) => reject(validation.errors))
        } else {
            return this.database.ref(this._base_path).push(data)
        }
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

export default Firebase
