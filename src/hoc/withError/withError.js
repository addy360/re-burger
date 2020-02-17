import React , {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary'

const WithError = (WrappedCompnt, axios)=>{
	return class extends Component{
		state = {
			error:null
		}
		componentWillMount(){
			this.resInter = axios.interceptors.response.use(res=>res,err=>{
				this.setState({error:err})
			})
			this.reqInter = axios.interceptors.request.use(req=>{
				this.setState({error:null})
				return req
			})
			console.log("component did update")
		}

		componentWillUnmount(){
			axios.interceptors.response.eject(this.resInter)
			axios.interceptors.request.eject(this.reqInter)
		}
		errorHandler= ()=>{
			this.setState({error:null})
		}
		render(){
			return (
				<Aux>
					<Modal clicked={this.errorHandler} show = { this.state.error }>
						{this.state.error?this.state.error.message:''}
					</Modal>
					<WrappedCompnt {...this.props}/>
				</Aux>
			)

		}
	}
}

export default WithError