import React, { Component } from 'react'
import Checkouts from '../../components/Order/checkouts/Checkouts'
import Contact from '../Checkout/Contact/Contact'
import { Route, Redirect } from 'react-router-dom'
// import { purchaseInit } from '../../store/actions/index'
import { connect } from 'react-redux'

class Checkout extends Component{
	onCancel = ()=>{
		this.props.history.goBack()
	}
	onContinue = ()=>{
		this.props.history.replace('/checkout/contact')
	}
	render(){
		let checkout = null
		if (this.props.ings) {
			// TODO: NEED FURTHER INSPECTION, TIRED NOW :(
			 const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
			// const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
			checkout =( <div>
							{purchasedRedirect}
							<Checkouts cancel ={this.onCancel} 
							continue ={this.onContinue} 
							ingredients={this.props.ings}
							/>
							<Route path={ this.props.match.path + '/contact' } component={Contact} />
						</div>)
		}
		return checkout
	}
}

const mapStateToProps = state=>{
	return {
		ings:state.burgerBuilder.ingredients,
		purchased:state.orders.purchased
	}
}



export default connect(mapStateToProps)(Checkout)