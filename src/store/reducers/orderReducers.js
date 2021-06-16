import * as types from '../types/orderTypes'

export const addOrder = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.ADD_ORDER_REQUEST:
      return { loading: true }
    case types.ADD_ORDER_SUCCESS:
      return { loading: false, success: true, order: payload }
    case types.ADD_ORDER_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_ORDER:
      return { ...state, error: null, success: null }
    default:
      return state
  }
}

export const getOrder = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_ORDER_REQUEST:
      return { ...state, loading: true }
    case types.GET_ORDER_SUCCESS:
      return { loading: false, order: payload }
    case types.GET_ORDER_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const payOrder = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.PAY_ORDER_REQUEST:
      return { loading: true }
    case types.PAY_ORDER_SUCCESS:
      return { loading: false, success: true }
    case types.PAY_ORDER_FAIL:
      return { loading: false, error: payload }
    case types.PAY_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const getCurrentUserOrders = (state = { orders: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_CURRENT_USER_ORDERS_REQUEST:
      return { loading: true }
    case types.GET_CURRENT_USER_ORDERS_SUCCESS:
      return { loading: false, orders: payload }
    case types.GET_CURRENT_USER_ORDERS_FAIL:
      return { loading: false, error: payload }
    case types.GET_CURRENT_USER_ORDERS_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const getOrders = (state = { orders: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_ORDERS_REQUEST:
      return { loading: true }
    case types.GET_ORDERS_SUCCESS:
      return { loading: false, orders: payload }
    case types.GET_ORDERS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const deliverOrder = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.DELIVER_ORDER_REQUEST:
      return { loading: true }
    case types.DELIVER_ORDER_SUCCESS:
      return { loading: false, success: true }
    case types.DELIVER_ORDER_FAIL:
      return { loading: false, error: payload }
    case types.DELIVER_ORDER_RESET:
      return {}
    default:
      return state
  }
}
