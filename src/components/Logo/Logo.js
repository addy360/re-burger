import React from 'react'
import logo from '../../assets/images/logo.png'
import './Logo.css'

const Logo = (props)=>{
	return (
		<div className="Logo">
			<img src={logo} alt="Burger" />
		</div>
	)
}

export default Logo