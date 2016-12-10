import Firebase from './base'


class Paginator extends Firebase {

    constructor (path, limit = 15) {
        super()
        this._base_path = path
        this.limit = limit

        this.data = {}
        this.last_key = null
    }

    paginate () {
        let limit = this.limit
        console.log('@@@@@', this.data);
        if (Object.keys(this.data).length === 0) {
            limit += 1
        }

        let ref = this.database.ref(this._base_path)
            .orderByKey()
            .limitToFirst(limit)

        if (Object.keys(this.data).length > 0) {
            ref = ref.startAt(this.last_key)
        }

        return ref.once('value').then(data => {
            this.data = data.val()
            this.last_key = Object.keys(this.data).pop()
            delete this.data[this.last_key]
            return this.data
        })
    }
}

export default Paginator
