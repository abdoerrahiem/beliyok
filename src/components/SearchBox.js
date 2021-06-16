import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form className='search-box' onSubmit={handleSubmit} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Cari Barang...'
        className='shadow-none'
      ></Form.Control>
      <Button type='submit' variant='warning' className='shadow-none'>
        Cari
      </Button>
    </Form>
  )
}

export default SearchBox
