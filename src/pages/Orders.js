import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders } from '../store/actions/orderActions'
import { indoCurrency } from '../utils'
import Moment from 'moment'
import 'moment/locale/id'
Moment.locale()

const Orders = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.getOrders)
  const { loading, error, orders } = orderList

  const loginUser = useSelector((state) => state.loginUser)
  const { userInfo } = loginUser

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrders())
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orderan</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : orders.length === 0 ? (
        <Message variant='info'>Kamu belum memiliki orderan</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Bayar</th>
              <th>Terkirim</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  {Moment(order.createdAt).subtract(10, 'days').calendar()}
                </td>
                <td>Rp. {indoCurrency(order.totalPrice)}</td>
                <td>
                  {order.isPaid ? (
                    Moment(order.paidAt).subtract(10, 'days').calendar()
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    Moment(order.deliveredAt).subtract(10, 'days').calendar()
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='success' className='btn-sm mr-2'>
                      Selengkapnya &rarr;
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Orders
