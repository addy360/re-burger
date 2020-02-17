import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/ToolBar/ToolBar'
import Sidenav from '../Navigation/SideNav/SideNav'
import './Layout.css'

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
				<Toolbar clicked={this.sideNavHandler}/>
				<Sidenav show={this.state.sideNav} clicked={this.sideNavHandler}/>
				<div> ToolBar, SideDrower, BackDrop</div>
				<main className="content">{this.props.children}</main>
			</Aux>
		)
	}
}


export default Layout