import React , { Component } from 'react'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import './Contact.css'
import Spinner from '../../../components/UI/Spinner/Spinner'


class Contact extends Component{
	state = {
		customer:{
	 		name:"Tester Testee",
			email:'test@test.com',
	 		address:{
					street:'test te',
	 				zipcode:1111,
				}
	 	},
	 	loading:false,
	 	modal:false

	}
	submitHandler= (e)=>{
		e.preventDefault()
		this.setState({loading:true})
		const order = {
			ingredients: this.props.data.ingredients,
			price:this.props.data.price,
			customer:{
				name:"Tester Testee",
				address:{
					street:'test te',
					zipcode:1111,
					country:'TestT'
				},
				email:'test@test.com'
			},
			deriveryMethod:'Fastest'
		}
		// console.log(order)
		axios.post('/orders.json',order)
		.then(res=>{
			this.setState({loading:false, modal:false})
			this.props.history.push('/')
			// console.log(res)
		})
		.catch(err=>{
			this.setState({loading:false, modal:false})
			console.log(err)
		})
		// console.log(this.props)

	}
	render(){
		console.log(this.props)
		let form = (
			<form>
				<input type="text" name="name" placeholder="Your Name" />
				<input type="email" name="email" placeholder="Your E-mail" />
				<input type="text" name="street" placeholder="Street" />
				<input type="text" name="postal" placeholder="Postal code" />
				<Button type="Success" clicked={ this.submitHandler }>Submit</Button>
			</form>
		)
		if (this.state.loading) {
			form = (
				<Spinner/>
			)
		}
		return (
			<div className="Contact">
				{this.state.loading ? <h1>Sending...</h1> : <h5>Enter your information</h5>}
				{form}
			</div>
		)
	}
}	


export default Contact