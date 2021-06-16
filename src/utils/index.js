export const indoCurrency = (number) =>
  number
    .toString()
    .split('')
    .reverse()
    .join('')
    .match(/\d{1,3}/g)
    .join('.')
    .split('')
    .reverse()
    .join('')

export const api = process.env.REACT_APP_API_URI

export const file = process.env.REACT_APP_API_FILE

export const configHeaders = { headers: { 'Content-Type': 'application/json' } }

export const configHeadersWithToken = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}

export const timeOut = (dispatch, type) => {
  setTimeout(() => {
    dispatch({ type })
  }, 3000)
}
