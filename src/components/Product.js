import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { indoCurrency, file } from '../utils'
import Rating from '../components/Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={`${file}${product.image}`}
          variant='top'
          className='product-img'
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='text-capitalize'>
            <strong>
              {product.name.length < 20
                ? product.name
                : `${product.name.substring(0, 20)}...`}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} ulasan`}
          />
        </Card.Text>
        <Card.Text as='h4' className='mt-4'>
          Rp. {indoCurrency(product.price)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
