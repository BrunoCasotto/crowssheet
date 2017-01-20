import {
    UPDATE_PROJECTS
} from '../mutation-types'

export default function() {

    const state = {
        projects: []
    }

    const mutations = {
        [UPDATE_PROJECTS] (state, projects) {
            state = projects
        }
    }
}
    export default {
        state,
        mutations
    }

