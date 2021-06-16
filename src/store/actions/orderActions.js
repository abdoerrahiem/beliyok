import axios from 'axios'
import * as types from '../types/orderTypes'
import { api, configHeadersWithToken, timeOut } from '../../utils'

export const addOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.ADD_ORDER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.post(
      `${api}/orders`,
      orderData,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.ADD_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.ADD_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_ORDER)
  }
}

export const getOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.get(
      `${api}/orders/${orderId}`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.GET_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: types.PAY_ORDER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `${api}/orders/${orderId}/pay`,
      paymentResult,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.PAY_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.PAY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCurrentUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_CURRENT_USER_ORDERS_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.get(
      `${api}/orders/myorders`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.GET_CURRENT_USER_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_CURRENT_USER_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_ORDERS_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.get(
      `${api}/orders`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.GET_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.DELIVER_ORDER_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `${api}/orders/${orderId}/deliver`,
      {},
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.DELIVER_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.DELIVER_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
