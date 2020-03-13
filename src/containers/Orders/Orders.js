import React , { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withError from '../../hoc/withError/withError'
import { fetchOrder } from '../../store/actions/index'
import { connect } from 'react-redux'

class Orders extends Component{

	componentDidMount(){
		this.props.onFetchOrders(this.props.token, this.props.userId)
	}

	render(){
		let order = !this.props.loading ? this.props.orders.map(el=>{
			return <Order key={el.id} price={el.price} ingredients = {el.ingredients}/>
		}) : <Spinner/>

		// if(this.props.loading) {
		// 	order=<Spinner/>
		// }
		return(
			<div>
				{order}
			</div>
		)
	}
}

const mapStateToProps = state =>{
	console.log(state)
	return {
		orders : state.orders.orders,
		loading : state.orders.loading,
		token: state.auth.token,
		userId:state.auth.userId
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onFetchOrders:(token, userId)=>dispatch(fetchOrder(token, userId))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)( withError(Orders,axios))