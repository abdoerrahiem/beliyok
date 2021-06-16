import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Users from './pages/Users'
import EditUser from './pages/EditUser'
import Products from './pages/Products'
import EditProduct from './pages/EditProduct'
import Orders from './pages/Orders'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/search/:keyword' component={Home} exact />
            <Route path='/page/:page' component={Home} />
            <Route path='/search/:keyword/page/:page' component={Home} />
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/profile' component={Profile} exact />
            <Route path='/shipping' component={Shipping} exact />
            <Route path='/payment' component={Payment} exact />
            <Route path='/placeorder' component={PlaceOrder} exact />
            <Route path='/product/:id' component={Product} exact />
            <Route path='/order/:id' component={Order} exact />
            <Route path='/admin/users' component={Users} exact />
            <Route path='/admin/products' component={Products} exact />
            <Route path='/admin/products/:page' component={Products} exact />
            <Route path='/admin/users/:id/edit' component={EditUser} exact />
            <Route
              path='/admin/products/:id/edit'
              component={EditProduct}
              exact
            />
            <Route path='/admin/orders' component={Orders} exact />
            <Route path='/cart/:id?' component={Cart} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
