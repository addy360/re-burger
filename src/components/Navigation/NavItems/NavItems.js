import React from 'react'
import './NavItems.css'
import Navitem from '../NavItem/NavItem'

const NavItems = (props)=>{
	return (
		<ul className="Navitems">
			<Navitem link="/" exact name="Burger"/>
			<Navitem link="/orders" name="Orders"/>
		</ul>
	)
}

export default NavItems