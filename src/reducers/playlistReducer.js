import {TOGGLE_VOTE, TOGGLE_PRIORITY, LOADED_PLAYLIST, PLAYLIST_LOADING} from '../constants'
import myData from '../data.json'

const initialState = {
    items: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type){

        case PLAYLIST_LOADING :
            console.log('Load')
            return {
                ...state,
                items: null,
                loading: true
            }

        case LOADED_PLAYLIST :
            return {
                ...state,
                items: myData,
                loading:false
            }


        case TOGGLE_PRIORITY :
            return {
                ...state,
                items: state.items.map((data) => {
                    if (data.priority && data.id !== action.id) {
                        return {...data, priority: false}
                    }
                    if (data.id === action.id) {
                        return {...data, priority: !data.priority}
                    }
                    return data
                }).sort((a, b) => b.priority - a.priority || b.votes.userVoted - a.votes.userVoted || a.id - b.id)
            }
            break;

        case TOGGLE_VOTE:
            return {...state,
                items : state.items.map((data) => {
                    if (data.id === action.id) {
                        return {...data, votes: {...data.votes, userVoted : !data.votes.userVoted, count: data.votes.userVoted ? 0 : 1} }
                    }
                    return data
                }).sort((a, b) => {
                    if(b.votes.userVoted && a.votes.userVoted){
                        return b.votes.userVoted - a.votes.userVoted
                    } else {
                        return b.priority - a.priority || b.votes.userVoted - a.votes.userVoted || a.id - b.id}
                })
            }
            break;

        default:
            return state
    }
}