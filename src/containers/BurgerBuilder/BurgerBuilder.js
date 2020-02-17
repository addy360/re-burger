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


const ING_PRICES = {
	salad:500,
	meat:1000,
	cheese:500,
	bacon:300
}
class BurgerBuilder extends Component{
	state = {
		ingredients:null,
		totalPrice : 3000,
		purchasable: false,
		modal:false,
		loading:false
	}

	componentDidMount(){
		this.setState({loading:true})
		axios.get('/ingredients.json')
		.then(res=>{
			console.log(res)
			this.setState({loading:false,ingredients:res.data})
		})
		.catch(err=>{
			this.setState({loading:false})
			console.log(err)
		})
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
		this.setState({loading:true})
		const order = {
			ingredients: this.state.ingredients,
			price:this.state.totalPrice,
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
		axios.post('/orders.json',order)
		.then(res=>{
			this.setState({loading:false, modal:false})
			console.log(res)
		})
		.catch(err=>{
			this.setState({loading:false, modal:false})
			console.log(err)
		})
	}

	render(){
	

		let burger= null
		let orderSummary = <Spinner/>
		burger = <Spinner/>
		

		if(this.state.ingredients){
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BurgerControls 
					price={this.state.totalPrice} 
					onSub = {this.removeIngredientHandler} 
					onAdd = {this.addIngredientHandler}
					modal={this.modalHandler}
					purchasable={ this.state.purchasable }/>
				</Aux>
			)
			if (!this.state.loading) {
			orderSummary = (<OrderSummary 
								cancel={this.modalHandler} 
								continue={this.continueHandler} 
								ingredients={this.state.ingredients}
								price = {this.state.totalPrice}
							/>) 
		}
			
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

export default withError(BurgerBuilder, axios)