import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getProduct, updateProduct } from '../store/actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../store/types/productTypes'
import { api } from '../utils'

const EditProduct = ({
  location,
  history,
  match: {
    params: { id },
  },
}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.getProduct)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.updateProduct)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_PRODUCT_RESET })
      history.push('/admin/products')
    } else {
      if (!product || product._id !== id) {
        dispatch(getProduct(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [id, dispatch, product, history, successUpdate])

  const handleUploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`${api}/upload`, formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/products'>
        &larr; Kembali
      </Link>
      <FormContainer>
        <h1>Edit Produk</h1>
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
            <Form.Group controlId='price'>
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type='number'
                placeholder='100000'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type='text'
                // placeholder='Masukkan link photo'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled
              />
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={handleUploadFile}
              />
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type='number'
                placeholder='10'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type='text'
                placeholder='Masukkan deskripsi'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default EditProduct
