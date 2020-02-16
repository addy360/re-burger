import React from 'react'
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/ToolBar/ToolBar'
import Sidenav from '../Navigation/SideNav/SideNav'
import './Layout.css'

const Layout =(props)=>(
	<Aux>
		<Toolbar/>
		<Sidenav/>
		<div> ToolBar, SideDrower, BackDrop</div>
		<main className="content">{props.children}</main>
	</Aux>
)

export default Layout