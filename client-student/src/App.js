import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'

import Home from "./components/Home";
import Rooms from "./components/Rooms";
import Booking from './components/Booking'
import AddressForm from './components/AddressForm'
import PaymentForm from './components/PaymentForm'
import Review from './components/Review'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Hostel Booking
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home/>}/>
              <Route path="/Rooms" element={<Rooms/>}/>
              <Route path="/Booking" element={<Booking/>}/>
              <Route path="/Address" element={<AddressForm/>}/>
              <Route path="/Payment" element={<PaymentForm/>}/>
              <Route path="/Review" element={<Review/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App