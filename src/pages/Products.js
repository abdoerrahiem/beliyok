import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  getProducts,
  deleteProduct,
  createProduct,
} from '../store/actions/productActions'
import { indoCurrency } from '../utils'
import { CREATE_PRODUCT_RESET } from '../store/types/productTypes'

const Products = ({
  history,
  match: {
    params: { page },
  },
}) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.getProducts)
  const { loading, error, products, pages, page: pageNumber } = productList

  const productDelete = useSelector((state) => state.deleteProduct)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.createProduct)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const loginUser = useSelector((state) => state.loginUser)
  const { userInfo } = loginUser

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(getProducts('', page || 1))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    page,
  ])

  const handleCreateProduct = () => dispatch(createProduct())

  const handleDelete = (productId) => {
    if (window.confirm('Apakah kamu yakin?')) {
      dispatch(deleteProduct(productId))
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      <Row className='align-items-center'>
        <Col>
          <h1>Produk</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={handleCreateProduct}>
            <i className='fas fa-plus' /> Tambah Produk
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Kategori</th>
            <th>Brand</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>Rp. {indoCurrency(product.price)}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                  <Button variant='success' className='btn-sm mr-2'>
                    <i className='fas fa-edit' />
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => handleDelete(product._id)}
                >
                  <i className='fas fa-trash' />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate pages={pages} page={pageNumber} isAdmin={true} />
    </>
  )
}

export default Products
