import axios from 'axios'
import { api } from '../../utils'
import * as types from '../types/cartTypes'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${api}/products/${id}`)

  dispatch({
    type: types.ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: types.REMOVE_CART_ITEM, payload: productId })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: types.ADD_SHIPPING_ADDRESS, payload: data })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const addPaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: types.ADD_PAYMENT_METHOD, payload: data })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
