import React from 'react'
import { Link } from 'react-router-dom'
import Error404i from '../../assets/png/error-404.png'
import Logo from '../../assets/png/logo.png'

import './Error404.scss'

export default function Error404() {
  return (
    <div className="error404">
      <img src={Logo} alt="Twittor-Logo"/>
      <img src={Error404i} alt="error404"/>
      <Link to="/"> Go To Home </Link> 
    </div>
  )
}
