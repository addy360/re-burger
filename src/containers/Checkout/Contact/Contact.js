import React , { Component } from 'react'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import './Contact.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'

import { purchaseBurgerStart } from '../../../store/actions/index'


class Contact extends Component{
	state = {
		Form:{
			name:this.inputConfig('input','text','Your name'),
			street:this.inputConfig('input','text','Street'),
			zipcode:this.inputConfig('input','text','ZipCode'),
			country:this.inputConfig('input','text','Country'),
			email:this.inputConfig('input','email','E-mail'),
			deriveryMethod:{
				elementType:'select',
				elementConfig:{
					options:[
						{value:'fastest',displayValue:'Fastest'},
						{value:'cheapest',displayValue:'Cheapest'}
					]
				},
			value:''
			}
		},
	 	modal:false
	}

	inputConfig(elType,type,plHolder){
		return {
			elementType:elType,
			elementConfig:{
				type:type,
				placeholder:plHolder
			},
			value:''
		}
	}
	submitHandler= (e)=>{
		e.preventDefault()
		this.setState({loading:true})
		// console.log(this.state)
		const formData = {}
		for(let key in this.state.Form){
			formData[key] = this.state.Form[key].value
		}
		// console.log(formData)
		const order = {
			ingredients: this.props.ings,
			price:this.props.price,
			customer:formData
			
		}

		this.props.onOrder(order)
		// console.log(order)
		
		// console.log(this.props)

	}
	onChangeHandler = (e,id)=>{
		const updatedForm = {...this.state.Form}
		const updatedEl = {...updatedForm[id]}
		updatedEl.value = e.target.value
		updatedForm[id] = updatedEl
		this.setState({Form:updatedForm})
	}
	render(){
		// console.log(this.state)
		const formArray = []
		for (let key in this.state.Form){
			formArray.push({id:key, name:this.state.Form[key]})
		}
		// console.log(formArray)
		let form = (
			<form onSubmit={ this.submitHandler }>
				{ formArray.map(conf=>(
					<Input 
						changed={(event)=>this.onChangeHandler(event,conf.id)} 
						key={conf.id} elementType={conf.name.elementType} 
						elementConfig={conf.name.elementConfig} 
						value={conf.name.value}  
					/>)) }
				<Button type="Success" >Submit</Button>
			</form>
		)
		if (this.props.loading) {
			form = (
				<Spinner/>
			)
		}
		return (
			<div className="Contact">
				{this.props.loading ? <h1>Sending...</h1> : <h5>Enter your information</h5>}
				{form}
			</div>
		)
	}
}	

const mapStateToProps = state=>{
	return {
		ings: state.burgerBuilder.ingredients,
		price:state.burgerBuilder.totalPrice,
		loading:state.orders.loading
	}
}

const mapDispatchToProps = dispatch =>{
	return {
		onOrder:(orderData)=> dispatch(purchaseBurgerStart(orderData))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Contact)