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
        case types.CLEAR_USER:
            return { ...state, loading: false }
        default:
            return state
    }
}

const channelReducer = (state = defaultChannelState.channel, action) => {
    switch (action.type) {
        case types.SET_CHANNEL:
            return action.payload

        default:
            return state
    }
}


const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer
})

export default rootReducer