import * as types from '../constants/UserTypes'

export const updateUser = data => {
  return {
    type: types.UPDATE_USER,
    data
  }
}

export const userLogout = data => {
  return {
    type: types.USER_LOGOUT,
    data
  }
}
