import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Modal,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { indoCurrency } from '../utils'
import {
  getProduct,
  createProductReview,
} from '../store/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { CREATE_REVIEW_RESET } from '../store/types/productTypes'
import Alert from '../components/Alert'
import { file } from '../utils'
import Moment from 'moment'
import 'moment/locale/id'
Moment.locale()

const Product = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [alert, setAlert] = useState(null)
  const [showImage, setShowImage] = useState(false)

  const handleCloseImage = () => setShowImage(false)
  const handleShowImage = () => setShowImage(true)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.getProduct)
  const { loading, error, product } = productDetails

  const createdProductReview = useSelector((state) => state.createProductReview)
  const {
    error: errorProductReview,
    success: successProductReview,
  } = createdProductReview

  const loginUser = useSelector((state) => state.loginUser)
  const { userInfo } = loginUser

  useEffect(() => {
    if (successProductReview) {
      setAlert('Review berhasil ditambahkan.')
      // alert('Review berhasil ditambahkan.')
      setRating(0)
      setComment('')
      dispatch({ type: CREATE_REVIEW_RESET })

      setTimeout(() => {
        setAlert(null)
      }, 3000)
    }
    dispatch(getProduct(match.params.id))
  }, [match, dispatch, successProductReview])

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    product && (
      <>
        <Link className='btn btn-light my-3' to='/'>
          &larr; Kembali
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Row>
              <Col md={4}>
                <Modal
                  aria-labelledby='contained-modal-title-vcenter'
                  centered
                  show={showImage}
                  onHide={handleCloseImage}
                  className='bg-dark-gray'
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Image
                      src={`${file}${product.image}`}
                      alt={product.name}
                      fluid
                      onClick={handleShowImage}
                    />
                  </Modal.Body>
                </Modal>
                <Image
                  title='Klik untuk melihat gambar'
                  src={`${file}${product.image}`}
                  alt={product.name}
                  fluid
                  rounded
                  onClick={handleShowImage}
                />
              </Col>
              <Col md={4}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3 className='text-capitalize'>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} Ulasan`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Harga: Rp. {product.price && indoCurrency(product.price)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Deskripsi: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Harga:</Col>
                        <Col>
                          <strong>
                            Rp. {product.price && indoCurrency(product.price)}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? 'Tersedia'
                            : 'Tidak Tersedia'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Jumlah</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={handleAddToCart}
                      >
                        Tambahkan <i className='fas fa-shopping-cart' />
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Ulasan</h2>
                {product.reviews.length === 0 && (
                  <Message variant='info'>Ulasan belum ada.</Message>
                )}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <Image
                        src='https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg'
                        rounded
                        height={30}
                      />
                      <strong className='ml-1'>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>
                        {Moment(review.createdAt)
                          .subtract(10, 'days')
                          .calendar()}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Tambahkan ulasan</h2>
                    {alert && <Alert variant='success' text={alert} />}
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Pilih...</option>
                            <option value='1'>1 - Buruk</option>
                            <option value='2'>2 - Cukup</option>
                            <option value='3'>3 - Baik</option>
                            <option value='4'>4 - Sangat Baik</option>
                            <option value='5'>5 - Istimewa</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Komentar</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant='warning'>
                        Silahkan <Link to='/login'>MASUK</Link> untuk
                        menambahkan review.
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </>
    )
  )
}

export default Product
