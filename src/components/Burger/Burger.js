import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props)=>{
	let transformedIngredients = Object.keys(props.ingredients).map(ingKey=>{
		return [...Array(props.ingredients[ingKey])].map((_,index)=>{
			return <BurgerIngredient key={ingKey + index} type={ingKey} />
		})
	}).reduce((arr, el)=>{
			return arr.concat(el)
	},[])
	if (transformedIngredients.length ===0) {
		transformedIngredients = <p>I wouldn't have an empty Burger if it was me, May you add Ingredients Please! Thank you</p>
	}

	return (
		<div className="Burger">
			<BurgerIngredient type = "bread-top"/>
			{transformedIngredients}
			<BurgerIngredient type = "bread-bottom"/>
		</div>
	)	
}

export default Burger