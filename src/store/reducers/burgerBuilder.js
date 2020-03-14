import { ADD_INGREDIENT,REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from '../actions/types'

const initialState = {
	ingredients:null,
	error:false,
	totalPrice : 3000,
	building:false
}

const ING_PRICES = {
	salad:500,
	meat:1000,
	cheese:500,
	bacon:300
}

const reducer = (state=initialState, action)=>{
	switch(action.type){
		case ADD_INGREDIENT:
			return {
				...state,
				building:true,
				ingredients:{
					...state.ingredients,
					[action.name]:state.ingredients[action.name] + 1,
				},
				totalPrice : state.totalPrice + ING_PRICES[action.name]
			}
		case REMOVE_INGREDIENT:
			if (state.ingredients[action.name]===0){
				return {
					...state
				}
			}
			return {
				...state,
				building:true,
				ingredients:{
					...state.ingredients,
					[action.name]:state.ingredients[action.name] - 1
				},
				totalPrice : state.totalPrice - ING_PRICES[action.name],
			}
		case SET_INGREDIENTS:
			return{
				...state,
				ingredients: action.ingredients,
				error:false,
				totalPrice:3000,
				building:false
			}
		case FETCH_INGREDIENTS_FAILED:
			return{
				...state,
				error:true
			}
		default:
			return state
	}
}

export default reducer