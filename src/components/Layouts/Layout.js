import React from 'react'
import Aux from '../../hoc/Auxiliary'
import './Layout.css'

const Layout =(props)=>(
	<Aux>
		<div> ToolBar, SideDrower, BackDrop</div>
		<main className="content">{props.children}</main>
	</Aux>
)

export default Layout