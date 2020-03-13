import React , {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Layout from '../../components/Layouts/Layout'
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
import Checkout from '../Checkout/Checkout'
import Orders from '../Orders/Orders'
import Auth from '../Auth/Auth'
import Logout from '../Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from '../../store/actions/index'

class App extends Component {
	componentDidMount(){
		this.props.onCheckAuthStatus()
	}
	render(){
	  return (
	  	<BrowserRouter>
		    <div className="App">
		      <h1>Hi there</h1>
		      <Layout>
			      <Switch>
			      	{ this.props.isAuth && (<Route path="/checkout" component={Checkout} />)}
			      	{ this.props.isAuth && (<Route path="/orders" component={Orders} />)}
			      	<Route path="/auth" component={Auth} />
			      	<Route path="/logout" component={Logout} />
			      	<Route path="/" component={BurgerBuilder} />
			      </Switch>
		      </Layout>
		    </div>
	  	</BrowserRouter>
	  );
	}
}

const mapStateToProps = state =>{
	return {
		isAuth:!!state.auth.token
	}
}

const mapDispatchToProps = dispatch =>{
	return {
		onCheckAuthStatus:()=>dispatch(authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
