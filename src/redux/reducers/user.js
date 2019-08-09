import * as types from '../constants/UserTypes'
import localStore from '../../utils/localStore'

const initialState = {
  id: null,
  avatar: null,
  name: null,
  phone: null,
  password: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER:
      const user = Object.assign(state, action.data)
      localStore.set('isLogin', true)
      localStore.set('user', user)
      return Object.assign(state, action.data)
    case types.USER_LOGOUT:
      localStore.set('isLogin', false)
      localStore.set('user', null)
      return {}
    default:
      return state
  }
}

export default user