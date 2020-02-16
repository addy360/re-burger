import React from 'react';
import './App.css';
import Layout from '../../components/Layouts/Layout'
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'

const App=()=> {
  return (
    <div className="App">
      <h1>Hi there</h1>
      <Layout>
		<BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
