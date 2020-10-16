import { combineReducers } from 'redux'
import * as types from '../actions/types'

const defaultUserState = {
    user: null,
    loading: true
}
const defaultChannelState = {
    channel: null
}

const userReducer = (state = defaultUserState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                user: action.payload,
                loading: false
            }
            break;
        case types.CLEAR_USER:
            return { ...state, loading: false }
        default:
            return state
            break;
    }
}

const channelReducer = (state = defaultChannelState, action) => {
    console.log("channel reducer")
    switch (action.type) {
        case types.SET_CHANNEL:
            return action.payload
            break;

        default:
            return state
            break;
    }
}


const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer
})

export default rootReducer