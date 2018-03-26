import {TOGGLE_VOTE, TOGGLE_PRIORITY, LOADED_PLAYLIST, PLAYLIST_LOADING} from '../constants'

export const loadingTrackList = () => {
    return dispatch => {
        dispatch({
            type: PLAYLIST_LOADING
        })
    }
}

export const loadList = () => {
    return dispatch => {
        dispatch({
            type: LOADED_PLAYLIST
        })
    }
}

export const togglePriority = (id)  => {
    return dispatch => {
        dispatch({
            type: TOGGLE_PRIORITY,
            id: id
        })
    }
}

export const toggleVote = (id) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VOTE,
            id: id
        })
    }
}