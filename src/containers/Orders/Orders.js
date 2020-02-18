import React , { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withError from '../../hoc/withError/withError'

class Orders extends Component{
	state = {
		orders :[],
		loading:true
	}
	componentDidMount(){
		axios.get('/orders.json')
		.then(res=>{
			const fetchedData = []
			for(let key in res.data){
				fetchedData.push({id:key,...res.data[key]})
			}
			this.setState({loading:false, orders:fetchedData})

		})
		.catch(err=>{
			// this.setState({loading:false, modal:false})
			console.log(err)
		})
	}

	render(){
		let order = this.state.orders.map(el=>{
			return <Order key={el.id} price={el.price} ingredients = {el.ingredients}/>
		})

		if(this.state.loading) {
			order=<Spinner/>
		}
		return(
			<div>
				{order}
			</div>
		)
	}
}

export default withError(Orders,axios)