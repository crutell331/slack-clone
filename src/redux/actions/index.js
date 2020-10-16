import * as types from './types'

export const setUser = (user) => {
    console.log(user)
    return { type: types.SET_USER, payload: user }
}
export const clearUser = () => {
    return { type: types.CLEAR_USER }
}