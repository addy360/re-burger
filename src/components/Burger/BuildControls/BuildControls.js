import React from 'react'
import './BuildControls.css'

import BuildControl from './BuildControl/BuildControl'


const controls = [
	{label:'Salad', type:'salad' },
	{label:'Bacon', type:'bacon' },
	{label:'Meat', type:'meat' },
	{label:'Cheese', type:'cheese' },
]
const BuildControls = (props)=>{

	return (
		<div className="BuildControls ">
			<h1> Current price :<strong> {props.price}</strong> /=</h1>
			{ controls.map(ctr=>{
				return (<BuildControl onAdd={()=>props.onAdd(ctr.type)} onSub={()=>props.onSub(ctr.type)} key={ctr.label} label={ctr.label} />)
			}) }
			<button disabled={!props.purchasable} 
			onClick = {props.modal}
			className="OrderButton">{ props.isAuth ? "CheckOut your finished burger now!": "Signup to Continue"}</button>
		</div>
	)
}

export default BuildControls