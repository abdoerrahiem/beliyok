import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../store/actions/cartActions'
import { indoCurrency, file } from '../utils'

const Cart = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [productId, qty, dispatch])

  const handleRemoveFromCart = (productId) =>
    dispatch(removeFromCart(productId))

  const handleCheckout = () => history.push('/login?redirect=shipping')

  return (
    <Row>
      <Col md={8}>
        <h1>Keranjang Belanja</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Keranjangmu kosong <Link to='/'>Kembali</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={1}>
                    <Image
                      src={`${file}${item.image}`}
                      alt={item.name}
                      className='cart-img'
                    />
                  </Col>
                  <Col md={3} className='my-2'>
                    <Link
                      to={`product/${item.product}`}
                      className='text-capitalize'
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={3} className='my-2'>
                    Rp. {indoCurrency(item.price)}
                  </Col>
                  <Col md={2} className='my-2'>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} className='my-2'>
                    <Button
                      type='button'
                      variant='outline-danger'
                      onClick={() => handleRemoveFromCart(item.product)}
                    >
                      <i
                        className='fas fa-trash'
                        style={{ color: 'red' }}
                        title='Hapus'
                      />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Jumlah Item (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              Rp.{' '}
              {indoCurrency(
                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                <i className='fas fa-credit-card mr-2' /> Bayar Sekarang
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
