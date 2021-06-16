import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUsers, deleteUser } from '../store/actions/userActions'

const Users = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.getUsers)
  const { loading, error, users } = userList

  const loginUser = useSelector((state) => state.loginUser)
  const { userInfo } = loginUser

  const deletedUser = useSelector((state) => state.deleteUser)
  const { success } = deletedUser

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers())
    } else {
      history.push('/')
    }
  }, [dispatch, history, success, userInfo])

  const handleDelete = (userId) => {
    if (window.confirm('Apakah kamu yakin?')) {
      dispatch(deleteUser(userId))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }} />
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant='success' className='btn-sm mr-2'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => handleDelete(user._id)}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Users
