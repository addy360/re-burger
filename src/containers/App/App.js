import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Layout from '../../components/Layouts/Layout'
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
import Checkout from '../Checkout/Checkout'
import Orders from '../Orders/Orders'

const App=()=> {
  return (
  	<BrowserRouter>
	    <div className="App">
	      <h1>Hi there</h1>
	      <Layout>
		      <Switch>
		      	<Route path="/checkout" component={Checkout} />
		      	<Route path="/orders" component={Orders} />
		      	<Route path="/" component={BurgerBuilder} />
		      </Switch>
	      </Layout>
	    </div>
  	</BrowserRouter>
  );
}

export default App;
