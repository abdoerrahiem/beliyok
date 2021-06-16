import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import {
  loginUser,
  registerUser,
  getCurrentUser,
  updateUser,
  getUsers,
  deleteUser,
  getUser,
  userUpdate,
} from './reducers/userReducers'
import {
  addOrder,
  getOrder,
  payOrder,
  getCurrentUserOrders,
  getOrders,
  deliverOrder,
} from './reducers/orderReducers'

const reducers = combineReducers({
  getProducts,
  getProduct,
  cart: cartReducers,
  loginUser,
  registerUser,
  getCurrentUser,
  updateUser,
  addOrder,
  getOrder,
  payOrder,
  getCurrentUserOrders,
  getUsers,
  deleteUser,
  getUser,
  userUpdate,
  deleteProduct,
  createProduct,
  updateProduct,
  getOrders,
  deliverOrder,
  createProductReview,
  getTopProducts,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStrorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  loginUser: { userInfo: userInfoFromStrorage },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
