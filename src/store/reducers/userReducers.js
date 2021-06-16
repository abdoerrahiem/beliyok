import * as types from '../types/userTypes'

export const loginUser = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.LOGIN_USER_REQUEST:
      return { loading: true }
    case types.LOGIN_USER_SUCCESS:
      return { loading: false, userInfo: payload }
    case types.LOGIN_USER_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_USER:
      return { ...state, error: null }
    case types.LOGOUT_USER:
      return {}
    default:
      return state
  }
}

export const registerUser = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.REGISTER_USER_REQUEST:
      return { loading: true }
    case types.REGISTER_USER_SUCCESS:
      return { loading: false, userInfo: payload }
    case types.REGISTER_USER_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_USER:
      return { ...state, error: null }
    default:
      return state
  }
}

export const getCurrentUser = (state = { user: {} }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true }
    case types.GET_CURRENT_USER_SUCCESS:
      return { loading: false, user: payload }
    case types.GET_CURRENT_USER_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_USER:
      return { ...state, error: null }
    case types.GET_CURRENT_USER_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const updateUser = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.UPDATE_USER_REQUEST:
      return { loading: true }
    case types.UPDATE_USER_SUCCESS:
      return { loading: false, success: true, userInfo: payload }
    case types.UPDATE_USER_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_USER:
      return { ...state, error: null, success: null }
    default:
      return state
  }
}

export const getUsers = (state = { users: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_USERS_REQUEST:
      return { loading: true }
    case types.GET_USERS_SUCCESS:
      return { loading: false, users: payload }
    case types.GET_USERS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const deleteUser = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.DELETE_USER_REQUEST:
      return { loading: true }
    case types.DELETE_USER_SUCCESS:
      return { loading: false, success: payload }
    case types.DELETE_USER_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_USER:
      return { ...state, error: null, success: null }
    default:
      return state
  }
}

export const getUser = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_USER_REQUEST:
      return { loading: true }
    case types.GET_USER_SUCCESS:
      return { loading: false, user: payload }
    case types.GET_USER_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const userUpdate = (state = { user: {} }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.USER_UPDATE_REQUEST:
      return { loading: true }
    case types.USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case types.USER_UPDATE_FAIL:
      return { loading: false, error: payload }
    case types.USER_UPDATE_RESET:
      return { user: {} }
    case types.REMOVE_ALERT_USER:
      return { ...state, error: null }
    default:
      return state
  }
}
