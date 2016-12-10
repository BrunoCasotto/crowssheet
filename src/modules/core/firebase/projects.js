import Firebase from './base'
import Validator from 'validatorjs'


class Project extends Firebase {

    constructor () {
        super()
        this._base_path = '/projects'

        this.create_rules = {
            name: 'required'
        }
    }

}

export default new Project
