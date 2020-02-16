import React from 'react'
import './NavItems.css'
import Navitem from '../NavItem/NavItem'

const NavItems = (props)=>{
	return (
		<ul className="Navitems">
			<Navitem link="/" name="Your Burger" active/>
			<Navitem link="/about" name="Checkout"/>
		</ul>
	)
}

export default NavItems