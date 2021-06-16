import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUser, userUpdate } from '../store/actions/userActions'
import * as types from '../store/types/userTypes'

const EditUser = ({
  location,
  history,
  match: {
    params: { id },
  },
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.getUser)
  const { loading, error, user } = userDetails

  const updatedUser = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updatedUser

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: types.USER_UPDATE_RESET })
      history.push('/admin/users')
    } else {
      if (!user || user._id !== id) {
        dispatch(getUser(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [id, dispatch, user, successUpdate, history])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(userUpdate({ _id: id, name, email, isAdmin }))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/users'>
        &larr; Kembali
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Label>Admin</Form.Label>
              <Form.Check
                type='checkbox'
                label='Admin'
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked)
                  console.log(e.target.checked)
                }}
              />
            </Form.Group>
            <Button type='submit' variant='primary' disabled={loading}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditUser
