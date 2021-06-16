import * as types from '../types/productTypes'

export const getProducts = (state = { products: [] }, action) => {
  const { type, payload, category } = action

  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case types.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: category
          ? payload.products.filter((product) => product.category === category)
          : payload.products,
        pages: payload.pages,
        page: payload.page,
        categories: payload.products.map((product) => product.category),
      }
    case types.GET_PRODUCTS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const getProduct = (state = { product: { reviews: [] } }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_PRODUCT_REQUEST:
      return { loading: true, ...state }
    case types.GET_PRODUCT_SUCCESS:
      return { loading: false, product: payload }
    case types.GET_PRODUCT_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const deleteProduct = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.DELETE_PRODUCT_REQUEST:
      return { loading: true }
    case types.DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case types.DELETE_PRODUCT_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_PRODUCT:
      return { ...state, error: null }
    default:
      return state
  }
}

export const createProduct = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case types.CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: payload }
    case types.CREATE_PRODUCT_FAIL:
      return { loading: false, error: payload }
    case types.CREATE_PRODUCT_RESET:
      return {}
    case types.REMOVE_ALERT_PRODUCT:
      return { ...state, error: null }
    default:
      return state
  }
}

export const updateProduct = (state = { product: {} }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.UPDATE_PRODUCT_REQUEST:
      return { loading: true }
    case types.UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: payload }
    case types.UPDATE_PRODUCT_FAIL:
      return { loading: false, error: payload }
    case types.UPDATE_PRODUCT_RESET:
      return { product: {} }
    case types.REMOVE_ALERT_PRODUCT:
      return { ...state, error: null }
    default:
      return state
  }
}

export const createProductReview = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.CREATE_REVIEW_REQUEST:
      return { loading: true }
    case types.CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case types.CREATE_REVIEW_FAIL:
      return { loading: false, error: payload }
    case types.CREATE_REVIEW_RESET:
      return {}
    case types.REMOVE_ALERT_PRODUCT:
      return { ...state, error: null, success: null }
    default:
      return state
  }
}

export const getTopProducts = (state = { products: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_TOP_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case types.GET_TOP_PRODUCTS_SUCCESS:
      return { loading: false, products: payload }
    case types.GET_TOP_PRODUCTS_FAIL:
      return { loading: false, error: payload }
    case types.REMOVE_ALERT_PRODUCT:
      return { ...state, error: null }
    default:
      return state
  }
}
