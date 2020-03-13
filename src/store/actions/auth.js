import axios from 'axios'
import { AUTH_FAIL,AUTH_SUCCESS,AUTH_START, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from './types'

export const authStart = () =>{
	return {
		type:AUTH_START
	}
}
export const authSuccess = ( token, userId) =>{
	return {
		type:AUTH_SUCCESS,
		token,
		userId
	}
}
export const authFail = ( error) =>{
	return {
		type:AUTH_FAIL,
		error
	}
}

export const authLogout = ()=>{
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
	localStorage.removeItem('expirationDate')
	return{
		type:AUTH_LOGOUT
	}
}

export const checkAuthTimeout = expirationTime =>{
	return dispatch =>{
		setTimeout(()=>{
			dispatch(authLogout())
		},expirationTime * 1000)
	}
}

export const setAuthRedirectPath = (path)=>{
	return{
		type: SET_AUTH_REDIRECT_PATH,
		path
	}
}
export const auth = (email, password, isSignup)=>{
	let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASvt_-25pf7STbttBs5lBUQexkGL2ftqM'
	if(!isSignup){
		url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASvt_-25pf7STbttBs5lBUQexkGL2ftqM'
	}
	return dispatch => {
		dispatch(authStart())
		axios.post(url,{
			email,
			password,
			returnSecureToken:true
		})
		.then(res=>{
			// console.log(res)
			const {idToken, localId, expiresIn} = res.data
			const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
			localStorage.setItem('token',idToken)
			localStorage.setItem('expirationDate',expirationDate)
			localStorage.setItem('userId',localId)
			dispatch(authSuccess(idToken,localId))
			dispatch(checkAuthTimeout(expiresIn))
		})
		.catch(err=>{
			// console.log(err.response)
			// const {errors} = res.data
			dispatch(authFail(err.response.data.error))
		})
	}
}

export const authCheckState = () =>{
	return dispatch =>{
		const token = localStorage.getItem('token')
		if (!token) {
			dispatch(authLogout())
		}else{
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId')
				dispatch(authSuccess(token,userId))
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
			}else{
				dispatch(authLogout())
			}
		}
	}
}
