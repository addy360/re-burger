import React from 'react'
import Logo from '../../Logo/Logo'
import Navitems from '../NavItems/NavItems'
import Sidetoggle from '../SideNav/SideToggle/SideToggle'
import './ToolBar.css'

const ToolBar = (props)=>{

	return (
		<header className="Toolbar">
			<Sidetoggle clicked = {props.clicked}/>
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