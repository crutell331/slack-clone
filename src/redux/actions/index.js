import * as types from './types'

export const setUser = (user) => {
    return { type: types.SET_USER, payload: user }
}
export const clearUser = () => {
    return { type: types.CLEAR_USER }
}

export const setChannel = (channel) => {
    return { type: types.SET_CHANNEL, payload: channel }
}