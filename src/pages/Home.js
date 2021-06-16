import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Badge } from 'react-bootstrap'
import { getProducts } from '../store/actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const Home = ({
  match: {
    params: { keyword, page },
  },
}) => {
  const dispatch = useDispatch()

  const productsList = useSelector((state) => state.getProducts)
  const {
    loading,
    error,
    products,
    pages,
    page: pageNumber,
    categories,
  } = productsList

  useEffect(() => {
    dispatch(getProducts(keyword, page || 1))
  }, [dispatch, keyword, page])

  const handleCategory = (category) => {
    if (category === 'all') {
      dispatch(getProducts(keyword, page || 1))
    } else {
      dispatch(getProducts(keyword, page || 1, category))
    }
  }

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          &larr; Kembali
        </Link>
      )}
      {keyword ? (
        <h6 className='text-center'>Hasil Pencarian untuk '{keyword}'</h6>
      ) : (
        <>
          <h5 className='mt-3 text-center'>Produk Terbaru</h5>
          {categories && (
            <>
              <Badge
                pill
                variant='light'
                className='mx-1'
                onClick={() => handleCategory('all')}
              >
                Semua
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  pill
                  variant='light'
                  className='mx-1'
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </>
          )}
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products.length === 0 ? (
        <Message variant='warning'>Produk tidak ditemukan</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={pageNumber}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default Home
