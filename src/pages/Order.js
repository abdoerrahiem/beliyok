import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { indoCurrency, api } from '../utils'
import { getOrder, payOrder, deliverOrder } from '../store/actions/orderActions'
import { PAY_ORDER_RESET, DELIVER_ORDER_RESET } from '../store/types/orderTypes'
import Moment from 'moment'
import 'moment/locale/id'
Moment.locale()

const Order = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const [sdkReady, setSdkReady] = useState(false)
  const [dollar, setDollar] = useState(null)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.getOrder)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.payOrder)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.deliverOrder)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const loginUser = useSelector((state) => state.loginUser)
  const { userInfo } = loginUser

  useEffect(() => {
    const convertToDollar = async () => {
      const { data } = await axios.get(
        'https://free.currconv.com/api/v7/convert?q=IDR_USD&compact=ultra&apiKey=6ec888e804ff5d67d4e8'
      )
      setDollar(data.IDR_USD)
    }

    convertToDollar()
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(`${api}/config/paypal`)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: PAY_ORDER_RESET })
      dispatch({ type: DELIVER_ORDER_RESET })
      dispatch(getOrder(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [id, dispatch, successPay, order, successDeliver, history, userInfo])

  const handleSuccessPayment = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(id, paymentResult))
  }

  const handleDeliver = () => dispatch(deliverOrder(id))

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1 className='text-uppercase'>Order ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Pengiriman</h2>
              <p>
                <strong>Nama: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Alamat: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Telah terkirim pada{' '}
                  {Moment(order.deliveredAt).subtract(10, 'days').calendar()}.
                </Message>
              ) : (
                <Message variant='warning'>Belum terkirim.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metode Pembayaran</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Telah dibayar pada{' '}
                  {Moment(order.paidAt).subtract(10, 'days').calendar()}.
                </Message>
              ) : (
                <Message variant='warning'>Belum dibayar.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Item Orderan</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='info'>Orderan kosong.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={6}>
                          {item.qty} x Rp. {indoCurrency(item.price)} = Rp.{' '}
                          {indoCurrency(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>OrderSummary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item</Col>
                  <Col>Rp. {indoCurrency(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Pengiriman</Col>
                  <Col>Rp. {indoCurrency(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rp. {indoCurrency(order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rp. {indoCurrency(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={(order.totalPrice * dollar).toFixed(2)}
                      onSuccess={handleSuccessPayment}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={handleDeliver}
                    >
                      Tandai sebagai terbayar
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Order
