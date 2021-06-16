import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { getTopProducts } from '../store/actions/productActions'
import { indoCurrency, file } from '../utils'

const ProductCarousel = () => {
  const dispatch = useDispatch(0)

  const productTopRated = useSelector((state) => state.getTopProducts)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary carousel-mod'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`product/${product._id}`}>
            <Image
              src={
                product.image.includes('uploads')
                  ? `${file}${product.image}`
                  : product.image
              }
              fluid
            />
            <Carousel.Caption className='carousel-caption'>
              <h2>{product.name}</h2>
              <h2>(Rp. {indoCurrency(product.price)})</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
