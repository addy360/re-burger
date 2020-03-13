import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import Spinner from '../../components/UI/Spinner/Spinner'
import withError from '../../hoc/withError/withError'
import axios from '../../axios-orders'

import { connect } from 'react-redux'
import { addIngredient, removeIngredient , initIngredients, purchaseInit, setAuthRedirectPath} from '../../store/actions/index'


class BurgerBuilder extends Component{
	state = {
		purchasable: false,
		modal:false,
	}

	componentDidMount(){
		// this.setState({loading:true})
		this.props.onInitIngredients()
		
	}

	updatePurchaseState(ingredients){
		const sum = Object.keys(ingredients).map(ingKey=>{
			return ingredients[ingKey]
		}).reduce((sum, el)=>{
			return sum + el
		},0)
		return sum > 0
	}

	

	modalHandler = ()=>{
		this.setState({modal:!this.state.modal})
	}

	purchaseHandler = ()=>{
		if(this.props.isAuth){ 
			this.setState({modal:!this.state.modal}) 
		} else{
			this.props.onSetAuthRedirectPath('/checkout') 
			this.props.history.push('/auth')
		}
	}

	continueHandler = ()=>{
		this.props.onInitPurchase()
		this.props.history.push({
			pathname:'/checkout'
		})
	}

	render(){
	
		let orderSummary = null
		let burger =this.props.error ? null : <p>Ingredients can not be loaded, try again</p>
		burger = <Spinner/>
		

		if(this.props.ings && !this.props.error){
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BurgerControls 
					isAuth = {this.props.isAuth}
					price={this.props.price} 
					onSub = {this.props.onRemoveIngs} 
					onAdd = {this.props.onAddIngs}
					modal={this.purchaseHandler}
					purchasable={ this.updatePurchaseState(this.props.ings) }/>
				</Aux>
			)

			orderSummary = (<OrderSummary 
								cancel={this.modalHandler} 
								continue={this.continueHandler} 
								ingredients={this.props.ings}
								price = {this.props.price}
							/>) 

			
		}


		return(
			<Aux>
				<Backdrop toggleShow={this.modalHandler} show = {this.state.modal} />
				<Modal show={this.state.modal}> 
					{ orderSummary }
				</Modal>
				{burger}
			</Aux>
		)
	}
}
const mapStateToProps = state=>{
	return {
		ings:state.burgerBuilder.ingredients,
		price:state.burgerBuilder.totalPrice,
		error:state.burgerBuilder.error,
		isAuth:!!state.auth.token
	}
}

const mapDispatchToProps = dispatch=>{
	return {
		onAddIngs:(ingName)=>dispatch(addIngredient(ingName)),
		onRemoveIngs:(ingName)=>dispatch(removeIngredient(ingName)),
		onInitIngredients:()=> dispatch(initIngredients()),
		onInitPurchase:()=>dispatch(purchaseInit()),
		onSetAuthRedirectPath:(path)=>dispatch(setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios))