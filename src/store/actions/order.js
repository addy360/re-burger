import axios from '../../axios-orders'

import { PURCHASE_BURGER_SUCCESS, 
	PURCHASE_BURGER_FAILED, 
	PURCHASE_BURGER_START, 
	PURCHASE_INIT,
	FETCH_ORDER_SUCCESS,
	FETCH_ORDER_FAIL,
	FETCH_ORDER_START
} from './types'

export const purchaseBurgerSuccess = (id, orderData)=>{
	return {
		type:PURCHASE_BURGER_SUCCESS,
		id,
		orderData
	}
}
export const purchaseBurgerfailed = (error)=>{
	return {
		type:PURCHASE_BURGER_FAILED,
		error
	}
}

export const startPurchase = ()=>{
	return {
		type:PURCHASE_BURGER_START
	}
}

export const purchaseInit = ()=>{
	return {
		type:PURCHASE_INIT
	}
}

export const purchaseBurgerStart = (orderData,token)=>{
	return dispatch=>{
		dispatch(startPurchase())
		axios.post(`/orders.json?auth=${token}`,orderData)
		.then(res=>{
			dispatch(purchaseBurgerSuccess(res.data.name,orderData))
			// console.log(res)
		})
		.catch(err=>{
			dispatch(purchaseBurgerfailed(err))
		})
	}
}

export const fetchOrderSuccess = (orders)=>{
	return {
		type:FETCH_ORDER_SUCCESS,
		orders
	}
}

export const fetchOrderFail = (error)=>{
	return{
		type:FETCH_ORDER_FAIL,
		error
	}
}

export const fetchOrderStart = () =>{
	return{
		type:FETCH_ORDER_START,
	}
}

export const fetchOrder = (token,userId) =>{
	return dispatch=>{
		dispatch(fetchOrderStart())
		axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
			.then(res=>{
				const fetchedData = []
				for(let key in res.data){
					fetchedData.push({id:key,...res.data[key]})
				}
				// console.log(fetchedData)
				dispatch(fetchOrderSuccess(fetchedData))

			})
			.catch(err=>{
				// this.setState({loading:false, modal:false})
				dispatch(fetchOrderFail(err))
				// console.log(err)
			})
	}
}