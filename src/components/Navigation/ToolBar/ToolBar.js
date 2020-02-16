import React from 'react'
import Logo from '../../Logo/Logo'
import Navitems from '../NavItems/NavItems'
import './ToolBar.css'

const ToolBar = (props)=>{

	return (
		<header className="Toolbar">
			<div>menu</div>
			<div style={{height:"80%"}}>
				<Logo/>
			</div>
			<nav className="DesktopOnly">
				<Navitems/>
			</nav>
		</header>
	)
}

export default ToolBar