import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import playlistReducer from './playlistReducer'

export default combineReducers ({
    routing: routerReducer,
    playlistReducer
})