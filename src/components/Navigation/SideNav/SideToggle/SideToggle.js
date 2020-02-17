import React from 'react'
import './SideToggle.css'

const Sidetoggle = (props)=>{
	return (
		<div onClick ={props.clicked} className="DrawerToggle">
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Sidetoggle