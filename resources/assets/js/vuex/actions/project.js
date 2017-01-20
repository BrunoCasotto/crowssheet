import * as types from './../mutation-types'

import projectApi from '_services/firebase/projects'
import Paginator from '_services/firebase/paginate'

let p = new Paginator('projects', 5)

export const fetchProjects = ({dispatch}) => {
    projectApi.onVal(projects => {
        dispatch(types.UPDATE_PROJECTS, projects.val())
    })
}
