import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Row, Col, Table, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader, { MiniLoader } from '../components/Loader'
import { getCurrentUser, updateUser } from '../store/actions/userActions'
import { getCurrentUserOrders } from '../store/actions/orderActions'
import { indoCurrency } from '../utils'
import Moment from 'moment'
import 'moment/locale/id'
Moment.locale()

const Profile = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.getCurrentUser)
  const { loading, error, user } = userDetails

  const loginUser = useSelector((state) => state.loginUser)
  const { userInfo } = loginUser

  const updatedUserDetails = useSelector((state) => state.updateUser)
  const { success } = updatedUserDetails

  const myOrderList = useSelector((state) => state.getCurrentUserOrders)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderList

  const inputRef = useRef()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getCurrentUser())
        dispatch(getCurrentUserOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }

    inputRef.current.focus()
  }, [userInfo, history, dispatch, user])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Password tidak cocok.')

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else {
      dispatch(updateUser({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3} className={userInfo.isAdmin && 'm-auto'}>
        {name && (
          <>
            <Image
              src='https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg'
              rounded
              height={70}
              className='d-block m-auto'
            />
            <h5 className='text-center border-bottom mt-1'>Profil {name}</h5>
          </>
        )}
        {message && <Message variant='warning'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Profil berhasil diupdate.</Message>
        )}
        {loading ? (
          <Loader />
        ) : (
          <>
            {updatedUserDetails.loading && <MiniLoader />}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='name'>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type='name'
                  ref={inputRef}
                  placeholder='Nama Kamu'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='user@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='****************'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='****************'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button type='submit' variant='primary' disabled={loading}>
                Update Profil
              </Button>
            </Form>
          </>
        )}
      </Col>
      {!userInfo.isAdmin && (
        <Col md={9}>
          <h1 className='text-center'>Orderanku</h1>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tanggal</th>
                  <th>Total</th>
                  <th>Sudah Bayar</th>
                  <th>Sudah Terkirim</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
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
                        Moment(order.deliveredAt)
                          .subtract(10, 'days')
                          .calendar()
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='warning' className='btn-sm'>
                          Selengkapnya &rarr;
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      )}
    </Row>
  )
}

export default Profile
