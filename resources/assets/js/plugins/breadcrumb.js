
export default (Vue) => {
    Object.defineProperty(Vue.prototype, '$breadcrumb', {
        get () {
            let routes = []
            let matched = this.$route.matched

            for (let i = 0; i < matched.length; i++) {
                if (matched[i].handler && matched[i].handler.breadcrumb) {
                    routes.push(matched[i])
                }
            }

            return routes
        }
    })
}
