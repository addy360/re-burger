import React from 'react'
import './Order.css'
import uuid from 'uuid'

const Order = (props)=>{
	const ingredients = []
	for (let ingName in props.ingredients){
		ingredients.push({
			amount:props.ingredients[ingName],
			name:ingName
		})
	}

	return (
		<div className="Order">
			 <p>Ingredients :  {ingredients.map(ing=><span key = {uuid.v4()}>{ing.name} ({ing.amount}) </span>)}</p>
			<p>Price : <strong>{props.price}/=</strong></p>
		</div>
	)
}

export default Order