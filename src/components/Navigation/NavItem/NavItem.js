import React from 'react'
import './NavItem.css'

const NavItem = (props)=>{
	return (
		<li className={['Navitem',].join(' ')}>
		 	<a 
		 		className={!!props.active ? 'active' : 'null'} 
		 		href={props.link}>{props.name}
		 	</a>
		</li>
	)
}

export default NavItem