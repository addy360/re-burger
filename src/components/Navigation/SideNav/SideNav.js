import React from 'react'
import Logo from '../../Logo/Logo'
import Navitems from '../NavItems/NavItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'
import './SideNav.css'

const Sidenav = (props)=>{
	let classes = ['Sidenav', 'Close']
	if (props.show) {
		classes =  ['Sidenav', 'Open']
	}
	return (
		<Aux>
			<Backdrop toggleShow={props.clicked} show = {props.show}/>
			<div className={classes.join(' ')} onClick={props.clicked}>
				<div style={{height:"11%", margin:'32px'}}>
					<Logo/>
				</div>
				<nav>
					<Navitems isAuth = {props.isAuth}/>
				</nav>
			</div>
		</Aux>
	)
}

export default Sidenav