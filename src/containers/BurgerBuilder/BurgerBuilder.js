import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Backdrop from '../../components/UI/Backdrop/Backdrop'


const ING_PRICES = {
	salad:500,
	meat:1000,
	cheese:500,
	bacon:300
}
export default class BurgerBuilder extends Component{
	state = {
		ingredients:{
			salad:0,
			bacon:0,
			meat:0,
			cheese:0
		},
		totalPrice : 3000,
		purchasable: false,
		modal:false
	}

	updatePurchaseState(){
		const ingredients = {
			...this.state.ingredients
		}

		const sum = Object.keys(ingredients).map(ingKey=>{
			return ingredients[ingKey]
		}).reduce((sum, el)=>{
			return sum + el
		},0)

		this.setState({purchasable:sum>0})
	}

	addIngredientHandler=(type)=>{
		const oldCount = this.state.ingredients[type]
		const newCount = oldCount + 1
		const updatedIngredients = {
			...this.state,
		} 
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + ING_PRICES[type]
		updatedIngredients.ingredients[type] = newCount
		updatedIngredients.totalPrice = newPrice

		this.setState(updatedIngredients)
		this.updatePurchaseState()
	}
	removeIngredientHandler=(type)=>{
		const oldCount = this.state.ingredients[type]
		if (oldCount <1) {
			return
		}
		const newCount = oldCount - 1
		const updatedIngredients = {
			...this.state,
		} 
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - ING_PRICES[type]
		updatedIngredients.ingredients[type] = newCount
		updatedIngredients.totalPrice = newPrice

		this.setState(updatedIngredients)
		this.updatePurchaseState()
	}

	modalHandler = ()=>{
		this.setState({modal:!this.state.modal})
	}

	continueHandler = ()=>{
		alert("CONTINUE")
	}
	render(){
		return(
			<Aux>
				<Backdrop toggleShow={this.modalHandler} show = {this.state.modal} />
				<Modal show={this.state.modal}> 
					<OrderSummary 
						cancel={this.modalHandler} 
						continue={this.continueHandler} 
						ingredients={this.state.ingredients}
						price = {this.state.totalPrice}
					/> 
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BurgerControls 
				price={this.state.totalPrice} 
				onSub = {this.removeIngredientHandler} 
				onAdd = {this.addIngredientHandler}
				modal={this.modalHandler}
				purchasable={ this.state.purchasable }/>
			</Aux>
		)
	}
}