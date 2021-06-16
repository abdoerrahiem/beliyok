import axios from 'axios'
import * as types from '../types/userTypes'
// import { GET_CURRENT_USER_ORDERS_RESET } from '../types/orderTypes'
import {
  api,
  configHeaders,
  configHeadersWithToken,
  timeOut,
} from '../../utils'

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_USER_REQUEST })

    const { data } = await axios.post(
      `${api}/users/login`,
      { email, password },
      configHeaders
    )

    dispatch({ type: types.LOGIN_USER_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: types.LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: types.LOGOUT_USER })
  // dispatch({ type: types.GET_CURRENT_USER_RESET })
  // dispatch({ type: GET_CURRENT_USER_ORDERS_RESET })
}

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_USER_REQUEST })

    const { data } = await axios.post(
      `${api}/users`,
      { name, email, password },
      configHeaders
    )

    dispatch({ type: types.REGISTER_USER_SUCCESS, payload: data })

    dispatch({ type: types.LOGIN_USER_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: types.REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  }
}

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_CURRENT_USER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.get(
      `${api}/users/profile`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_CURRENT_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  }
}

export const updateUser = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.UPDATE_USER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `${api}/users/profile`,
      userData,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: data })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  }
}

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_USERS_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.get(
      `${api}/users`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.GET_USERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.DELETE_USER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.delete(
      `${api}/users/${userId}`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.DELETE_USER_SUCCESS, payload: data.message })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  } catch (error) {
    dispatch({
      type: types.DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  }
}

export const getUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_USER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.get(
      `${api}/users/${userId}`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.GET_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userUpdate = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.USER_UPDATE_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `${api}/users/${user._id}`,
      user,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.USER_UPDATE_SUCCESS })

    dispatch({ type: types.GET_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_USER)
  }
}
