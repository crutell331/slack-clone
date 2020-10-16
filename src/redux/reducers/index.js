import { combineReducers } from 'redux'
import * as types from '../actions/types'

const defaultState = {
    user: null,
    loading: true
}

const userReducer = (state = defaultState, action) => {
    console.log("in reducer", action.payload)
    switch (action.type) {
        case types.SET_USER:
            return {
                user: action.payload,
                loading: false
            }
            break;

        default:
            return state
            break;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer