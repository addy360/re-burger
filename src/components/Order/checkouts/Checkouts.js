import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import './Checkouts.css'

const Checkouts = (props)=>{

	return (
		<div className="Checkouts">
			<h1>It's definately <strong> tasty</strong></h1>
			<div style={{width:'100%',margin:'auto'}}>
				<Burger ingredients = {props.ingredients}/>
			</div>
			<Button type='Danger' clicked={props.cancel} >Cancel</Button>
			<Button type='Success' clicked={props.continue} >Continue</Button>
		</div>
	)
}

export default Checkouts