import {
    LOADER_SHOW
} from '../mutation-types';

export const toggleLoader = ({dispatch}) => {
    dispatch(LOADER_SHOW);
};