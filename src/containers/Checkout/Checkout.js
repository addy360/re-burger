import React, { Component } from 'react'
import Checkouts from '../../components/Order/checkouts/Checkouts'
import Contact from '../Checkout/Contact/Contact'
import { Route } from 'react-router-dom'

class Checkout extends Component{
	state = {
		ingredients: null,
		price:0
	}

	componentWillMount(){
		let price = 0
		let paramString = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		for (let i of paramString.entries()){
			if (i[0] === 'price') {
				price = i[1]
				continue
			}
			ingredients[i[0]] = +i[1]
		}
		this.setState({ingredients:{...ingredients},price:price})
		console.log(this.state)
	}

	onCancel = ()=>{
		this.props.history.goBack()
	}
	onContinue = ()=>{
		this.props.history.replace('/checkout/contact')
	}
	render(){
		return (
			<div>
				<Checkouts cancel ={this.onCancel} 
				continue ={this.onContinue} 
				ingredients={this.state.ingredients}
				/>
				<Route path={ this.props.match.path + '/contact' } render={(props)=><Contact data={this.state} {...props}/>} />
			</div>
		)
	}
}

export default Checkout