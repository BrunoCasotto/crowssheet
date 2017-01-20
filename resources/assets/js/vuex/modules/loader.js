import {
    LOADER_SHOW
} from '../mutation-types'

export default function() {

    const state = {
        active: false
    };

    const mutations = {
        [LOADER_SHOW] (state) {
            state.active = !state.active;
        }
    };

    return {
        state,
        mutations
    };
}