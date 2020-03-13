import React from 'react'
import './NavItems.css'
import Navitem from '../NavItem/NavItem'

const NavItems = (props)=>{
	let auth = props.isAuth ? <Navitem link="/logout" name="Logout"/> : <Navitem link="/auth" name="Authenticate"/>
	return (
		<ul className="Navitems">
			<Navitem link="/" exact name="Burger"/>
			{props.isAuth && <Navitem link="/orders" name="Orders"/>}
			{auth}
		</ul>
	)
}

export default NavItems