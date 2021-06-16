import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { addPaymentMethod } from '../store/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addPaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='text-center'>Pembayaran</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Pilih Metode Pembayaran</Form.Label>
          <Col>
            <Form.Check
              ref={inputRef}
              type='radio'
              label='PayPal / Kartu Kredit'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Selanjutnya
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
