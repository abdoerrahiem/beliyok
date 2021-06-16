import * as types from '../types/cartTypes'

export const cartReducers = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case types.ADD_CART_ITEM:
      const existItem = state.cartItems.find(
        (x) => x.product === payload.product
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? payload : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        }
      }
    case types.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      }
    case types.ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      }
    case types.ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      }
    default:
      return state
  }
}
