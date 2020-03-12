import React from 'react'
import './Input.css'
import uuid from 'uuid'

const Input = (props)=>{
	// console.log(props.elementConfig)
	let element = null
	switch(props.elementType){
		case("input"):
			element = <input onChange={props.changed} {...props.elementConfig} className="InputEl" value={props.value} />
			break
		case("textarea"):
			element = <textarea onChange={props.changed} {...props.elementConfig} className="InputEl" value={props.value} />
			break
		case("select"):
			element = (
				<select onChange={props.changed}
					className="InputEl" 
					value={props.value} >
					{ props.elementConfig.options.map(opt=>(<option key={uuid.v4()} value={opt.value}>{opt.displayValue}</option>)) }
				</select>)
			break
			
		default:
			element = <input onChange={props.changed} {...props.elementConfig} className="InputEl" value={props.value}/>
			break
			
			
	}

	return(
		<div className="Input">
			{element}
		</div>
	)
}

export default Input