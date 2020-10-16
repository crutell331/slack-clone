import { combineReducers } from 'redux'
import * as types from '../actions/types'

const defaultState = {
    user: null,
    loading: true
}

const userReducer = (state = defaultState, action) => {
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

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer