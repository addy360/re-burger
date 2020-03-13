import React , { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

import './Auth.css'
import { auth, setAuthRedirectPath } from '../../store/actions/index'
import { connect } from 'react-redux'
class Auth extends Component{
	state = {
		Form:{
			email:this.inputConfig('input','email','Your Email'),
			password:this.inputConfig('input','password','Password'),
		},
		isSignup:true
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
	componentDidMount(){
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath() 
		}
	}
	submitHandler = (e)=>{
		const {email,password} = this.state.Form
		e.preventDefault()
		this.props.onAuth(email.value,password.value, this.state.isSignup)
	}

	onChangeHandler = (e,id)=>{
		const updatedForm = {...this.state.Form}
		const updatedEl = {...updatedForm[id]}
		updatedEl.value = e.target.value
		updatedForm[id] = updatedEl
		this.setState({Form:updatedForm})
	}

	switchAuthHandler = ()=>{
		this.setState(prevState=>{
			return{
				isSignup:!prevState.isSignup
			}
		})
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
				<h1>{this.state.isSignup ? 'Sign Up': 'Login'}</h1>
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

		if (this.props.loading) form = <Spinner/>;
		let errorMsg = this.props.error ?  <p className="Error">{this.props.error.message.split('_').join(' ').toLowerCase()}</p>: null
		let redirect = this.props.isAuth && <Redirect to = {this.props.authRedirectPath}/>
		return (
			<div className="Contact">
				{redirect}
				{errorMsg}
				{form}
				<p>Have an Account? <span onClick={this.switchAuthHandler}>Login</span></p>
			</div>
		)
	}
}

const mapStateToProps = state =>{
	return{
		loading:state.auth.loading,
		error:state.auth.error,
		isAuth:!!state.auth.token,
		buildingBurger:state.burgerBuilder.building,
		authRedirectPath:state.auth.authRedirectPath,
	}
}

const mapDispatchToProps = dispatch =>{
	return {
		onAuth: (email,password, isSignup)=>dispatch(auth(email,password,isSignup)),
		onSetAuthRedirectPath:()=>dispatch(setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)