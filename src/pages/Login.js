import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'
import { loginUser as login } from '../store/actions/userActions'

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const loginUser = useSelector((state) => state.loginUser)
  const { loading, error, userInfo } = loginUser

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const inputRef = useRef()

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }

    inputRef.current.focus()
  }, [userInfo, history, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(login(email, password))
  }

  return (
    <>
      <Meta title='BeliYok! | Masuk' />
      <FormContainer>
        <h1>Masuk</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              ref={inputRef}
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
          <Button type='submit' variant='primary' disabled={loading}>
            Masuk
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Belum punya akun?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Daftar Sekarang
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default Login
