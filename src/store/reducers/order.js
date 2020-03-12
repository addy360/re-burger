import { PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAILED , 
	PURCHASE_BURGER_START, 
	PURCHASE_INIT,
	FETCH_ORDER_START,
	FETCH_ORDER_FAIL,
	FETCH_ORDER_SUCCESS
} from '../actions/types'

const initialState = {
	orders:[],
	loading:false,
	purchased:false
}

const reducer = (state = initialState, action)=>{
	switch(action.type){
		case PURCHASE_BURGER_START:
			return{
				...state,
				loading:true
			}
		case PURCHASE_BURGER_SUCCESS:
			return {
				...state,
				loading:false,
				purchased:true,
				orders:state.orders.concat({...action.orderData, id:action.orderId})
			}
		case PURCHASE_BURGER_FAILED:
			return {
				...state,
				loading:false,
			}
		case PURCHASE_INIT:
			return{
				...state,
				purchased:true
			}
		case FETCH_ORDER_START:
			return{
				...state,
				loading:true
			}
		case FETCH_ORDER_SUCCESS:
			return{
				...state,
				orders:action.orders,
				loading:false
			}
		case FETCH_ORDER_FAIL:
			return{
				...state,
				loading:false
			}
		
		default:
			return state
	}
}

export default reducer