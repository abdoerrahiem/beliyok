import axios from 'axios'
import * as types from '../types/productTypes'
import { api, configHeadersWithToken, timeOut } from '../../utils'

export const getProducts = (keyword = '', page = '', category) => async (
  dispatch
) => {
  try {
    dispatch({ type: types.GET_PRODUCTS_REQUEST })

    const { data } = await axios.get(
      `${api}/products?keyword=${keyword}&page=${page}`
    )

    dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: data, category })
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_REQUEST })

    const { data } = await axios.get(`${api}/products/${productId}`)

    dispatch({ type: types.GET_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.delete(
      `${api}/products/${productId}`,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: types.DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_PRODUCT)
  }
}

export const createProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.CREATE_PRODUCT_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.post(
      `${api}/products/`,
      productData,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.CREATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_PRODUCT)
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.UPDATE_PRODUCT_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `${api}/products/${product._id}`,
      product,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.UPDATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_PRODUCT)
  }
}

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: types.CREATE_REVIEW_REQUEST })

    const {
      loginUser: { userInfo },
    } = getState()

    const { data } = await axios.post(
      `${api}/products/${productId}/reviews`,
      review,
      configHeadersWithToken(userInfo.token)
    )

    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: data })

    timeOut(dispatch, types.REMOVE_ALERT_PRODUCT)
  } catch (error) {
    dispatch({
      type: types.CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    timeOut(dispatch, types.REMOVE_ALERT_PRODUCT)
  }
}

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_TOP_PRODUCTS_REQUEST })

    const { data } = await axios.get(`${api}/products/top`)

    dispatch({ type: types.GET_TOP_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: types.GET_TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
