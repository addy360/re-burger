import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavItem.css'

const NavItem = (props)=>{
	return (
		<li className={['Navitem',].join(' ')}>
		 	<NavLink exact = {props.exact} to = {props.link}> 
		 		 {props.name}
		 	</NavLink>
		</li>
	)
}

export default NavItem