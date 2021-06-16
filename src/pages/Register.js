import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'
import { registerUser as register } from '../store/actions/userActions'

const Register = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const registerUser = useSelector((state) => state.registerUser)
  const { loading, error, userInfo } = registerUser

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

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setMessage('Lengkapi data yang dibutuhkan untuk bisa mendaftar.')

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else if (password !== confirmPassword) {
      setMessage('Password tidak cocok.')

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <>
      <Meta title='BeliYok! | Daftar' />
      <FormContainer>
        <h1>Daftar Akun</h1>
        {message && <Message variant='warning'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
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
            Daftar
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Sudah punya akun?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Masuk
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default Register
