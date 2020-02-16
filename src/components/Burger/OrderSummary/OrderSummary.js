import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummary = (props)=>{
	const ingredients = Object.keys(props.ingredients).map(ingKey=>{
		return (<li key={ingKey}> {ingKey} :  <strong>{props.ingredients[ingKey]}</strong> </li>)
	})
	return (
		<Aux>
			<h3> Your Order </h3>
			<p>Ingredients you chose for this delicious Burger</p>
			<ul>
				{ingredients}
			</ul>
			<p>Total price : <strong>{props.price} /=</strong></p>
			<p> Wanna take it home? </p>
			<Button type="Danger" clicked={props.cancel}>
				Cancel
			</Button>
			<Button type="Success" clicked={props.continue}>
				Continue
			</Button>
		</Aux>
	)
}

export default OrderSummary