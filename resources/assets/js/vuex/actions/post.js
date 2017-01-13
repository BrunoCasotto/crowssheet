import {
    UPDATE_POSTS
} from '../mutation-types'

export const updatePost = ({dispatch}, posts) => {
	dispatch(UPDATE_POSTS, posts)

}