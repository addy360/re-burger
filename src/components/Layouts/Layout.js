import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/ToolBar/ToolBar'
import Sidenav from '../Navigation/SideNav/SideNav'
import './Layout.css'

import { connect } from 'react-redux'

class Layout extends Component{
	state = {
		sideNav: false
	}

	sideNavHandler=()=>{
		this.setState((prevState)=>{
			return {sideNav:!prevState.sideNav}
		})
		// this.setState({sideNav:!this.state.sideNav})
		// console.log(this.state)
	}
	render(){
		return (

			<Aux>
				<Toolbar isAuth = {this.props.isAuthenticated} clicked={this.sideNavHandler}/>
				<Sidenav isAuth = {this.props.isAuthenticated} show={this.state.sideNav} clicked={this.sideNavHandler}/>
				<main className="content">{this.props.children}</main>
			</Aux>
		)
	}
}

const mapStateToProps = state =>{
	return{
		isAuthenticated:!!state.auth.token
	}
}

export default connect(mapStateToProps)(Layout)