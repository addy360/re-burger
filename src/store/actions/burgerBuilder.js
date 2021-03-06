import * as actionTypes from './types'
import axios from '../../axios-orders'

export const addIngredient = (name)=>{
	return {
		type:actionTypes.ADD_INGREDIENT,
		name
	}
}
export const removeIngredient = (name)=>{
	return {
		type:actionTypes.REMOVE_INGREDIENT,
		name
	}
}

export const setIngredients = ingredients=>{
	return {
		type:actionTypes.SET_INGREDIENTS,
		ingredients
	}
}

export const fetchIngredientsFailed = ()=>{
	return {
		type:actionTypes.FETCH_INGREDIENTS_FAILED
	}
}

export const initIngredients = ()=>{
	return dispatch=>{
		axios.get('/ingredients.json')
		.then(res=>{
			// console.log(res)
			dispatch(setIngredients(res.data))
		})
		.catch(err=>{
			// console.log(err)
			dispatch(fetchIngredientsFailed())
		})
	}
}
