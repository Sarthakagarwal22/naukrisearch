import React from 'react';

// import {loginUrl} from '../local-data/config';
// import {postRequest} from '../helpers/api-response';

import history from '../history';

import {username, password} from '../local-data/config';
import {userProfile} from '../local-data/stub-response';

import './stylesheets/login.css'

export default class Login extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			validUsername:false,
			validPassword:false,
			loginAttempt:0,
			serverError: false
		}
		this.loginResponse = {}
		this.checkValidLengthAndShowError = this.checkValidLengthAndShowError.bind(this);
		this.resetValidUsernameAndPassword = this.resetValidUsernameAndPassword.bind(this);
		this.loginMethod = this.loginMethod.bind(this);
	}

	checkValidLengthAndShowError(fieldValue, stateKey){
		this.setState({[stateKey]:fieldValue.length>0})
	}

	resetValidUsernameAndPassword(){
		this.setState({validPassword:true,validUsername:true, serverError:false})
		this.props.reset()
	}
	
	// async loginMethod(usernameEntered,passwordEntered) {
	// 	this.resetValidUsernameAndPassword()
	// 	var loginData = {
	// 		"username": usernameEntered,
	// 		"password": passwordEntered
	// 	}
	// 	this.loginResponse = await postRequest(loginUrl, loginData)
	// 	if(typeof this.loginResponse === "string"){
	// 		this.setState({serverError:true})
	// 	}
	// 	else{
	// 		this.props.loginMethod(this.response.user); 
	// 	}
	// }

	loginMethod(usernameEntered, passwordEntered) {
		this.resetValidUsernameAndPassword()
		if(usernameEntered === username && passwordEntered === password)
			this.props.successfulLogin(userProfile)
	}

	render(){
		let username;
		let password;
		let {
			loginSuccessful,
		} = this.props
		return(
			<div className="main">
			<div className="left">
				<div className="heading">
					<h1>Naukri Search</h1>
					<br />
					<h2>Login</h2>
					<br />
					<p className="sub-heading">Please enter your credentials</p><br/>
					<label className="email_label">USERNAME <span style={{color:"red"}}> *</span><br/>
					<input 
					autoComplete="off"
					autoFocus
					ref={node => {username=node}} 
					type="text" 
					name="user" 
					className="email_input" 
					onKeyPress={(event) => {
						if(event.which===13){
							this.checkValidLengthAndShowError(username.value, "validUsername");
							password.focus();
						}
					}} 
					onBlur={(event) => {
						this.checkValidLengthAndShowError(username.value, "validUsername")
					}} 
					style = {{borderColor : (!this.state.validUsername && this.state.loginAttempt>0) ? "red":"var(--light-grey)"}}/> <br/>
					</label>
					<br/>

					<label className="email_label">PASSWORD <span style={{color:"red"}}> *</span><br/>
					<input 
					autoComplete="off"
					ref={node => {password=node}}
					type="password" 
					name="pass" 
					className="pass_input" 
					onKeyPress={(event)=>{
						if(event.which===13){
							this.checkValidLengthAndShowError(password.value, "validPassword");
							if(this.state.validUsername && this.state.validPassword){
								this.setState({loginAttempt:this.state.loginAttempt+1})	
								this.loginMethod(username.value,password.value)
							}
						}
					}} 
					onBlur={(event)=>{
						this.checkValidLengthAndShowError(password.value, "validPassword")
					}} 
					style={{borderColor : (this.state.loginAttempt > 0 && !this.state.validPassword) ? "red":"var(--light-grey)"}}/> <br/>
					</label><br/>
					
					<button onClick={()=>{
						this.setState({loginAttempt:this.state.loginAttempt+1})
						this.checkValidLengthAndShowError(username.value, "validUsername");
						this.checkValidLengthAndShowError(password.value, "validPassword");
						if(this.state.validUsername && this.state.validPassword)
							this.loginMethod(username.value,password.value)}
					} style={{background: (!loginSuccessful && this.state.loginAttempt>0) ? "red":"var(--blue)"}}>
					Login
					</button>
					<br /><br />
					<p className="medium"> New User? <span className="clickable coral" onClick={()=>{history.push("/register")}}>Sign Up</span> </p>
					{
						this.state.loginAttempt>0 &&
						<div>
						<br />
						{
							!loginSuccessful && 
							<p className="small red">Password or User combination is wrong</p>
						}
						{
							!this.state.validUsername && 
							<p className="small red">Empty Username field</p>
						}
						{
							!this.state.validPassword && 
							<p className="small red">Empty Password field</p>
						}
						{
							this.state.serverError && 
							<p className="small red">Could not connect to server, please try again</p> 
						}
						</div>
					}
				</div>	
			</div>
			<div className="right">
			</div>
			</div>
		);
	}
}
