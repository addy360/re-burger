import React from 'react'
import Logo from '../../Logo/Logo'
import Navitems from '../NavItems/NavItems'
import './SideNav.css'

const Sidenav = ()=>{
	return (
		<div className="Sidenav">
			<div style={{height:"11%", margin:'32px'}}>
				<Logo/>
			</div>
			<nav>
				<Navitems/>
			</nav>
		</div>
	)
}

export default Sidenav