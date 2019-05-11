import React from 'react';

import {loginUrl} from '../local-data/config';
import {postRequest} from '../helpers/api-response';

import './stylesheets/login.css'

export default class Login extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			vaildFullname: false,
			validEmail: false,
			validUsername:false,
			validPassword:false,
			loginAttempt:0,
			serverError: false
		}
		this.loginResponse = {}
		this.checkValidLengthAndShowError = this.checkValidLengthAndShowError.bind(this);
		this.resetErrorState = this.resetErrorState.bind(this);
		this.checkEmail = this.checkEmail.bind(this);
		this.registerMethod = this.registerMethod.bind(this);
	}

	checkValidLengthAndShowError(fieldValue, stateKey){
		this.setState({[stateKey]:fieldValue.length>0})
	}

	resetErrorState(){
		this.setState({validPassword:true,validUsername:true,validFullname:true,validEmail:true, serverError:false})
		this.props.reset()
	}
	
	checkEmail(emailEntered) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		this.setState({validEmail:re.test(emailEntered)});
	}

	registerMethod(usernameEntered, passwordEntered, nameEntered, emailEntered) {
		this.resetErrorState();
		var currentUser = {
			id:9,
			email: emailEntered,
			name: nameEntered,
			jobIds:[],
			role:'candidate'
		}
			this.props.setCurrentUser(currentUser)
	}

	render(){
		let username,fullname,password,email;
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
					

					<label className="email_label">FULLNAME <span style={{color:"red"}}> *</span><br/>
					<input 
					autoComplete="off"
					autoFocus
					ref={node => {fullname=node}} 
					type="text" 
					name="name" 
					className="email_input" 
					onKeyPress={(event) => {
						if(event.which===13){
							this.checkValidLengthAndShowError(fullname.value, "validFullname");
							email.focus();
						}
					}} 
					onBlur={(event) => {
						this.checkValidLengthAndShowError(fullname.value, "validUsername")
					}} 
					style = {{borderColor : (!this.state.validFullname && this.state.loginAttempt>0) ? "red":"var(--light-grey)"}}/> <br/>
					</label>


					<label className="email_label">EMAIL <span style={{color:"red"}}> *</span><br/>
					<input 
					autoComplete="off"
					autoFocus
					ref={node => {email=node}} 
					type="text" 
					name="email" 
					className="email_input" 
					onKeyPress={(event) => {
						if(event.which===13){
							this.checkEmails(email.value);
							username.focus();
						}
					}} 
					onBlur={(event) => {
						this.checkEmails(email.value)
					}} 
					style = {{borderColor : (!this.state.validEmail && this.state.loginAttempt>0) ? "red":"var(--light-grey)"}}/> <br/>
					</label>


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
						this.checkValidLengthAndShowError(username.value, "validUsername");
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
							if(this.state.validUsername && this.state.validPassword && this.state.validEmail && this.state.validFullname){
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
						this.checkValidLengthAndShowError(fullname.value, "validPassword");
						this.checkEmail(email.value);
						if(this.state.validUsername && this.state.validPassword && this.state.validEmail && this.state.validFullname)
							this.loginMethod(username.value,password.value)}
					} style={{background: (!loginSuccessful && this.state.loginAttempt>0) ? "red":"var(--blue)"}}>
					Login
					</button>
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
							!this.state.validFullname && 
							<p className="small red">Empty Fullname field</p>
						}
						{
							!this.state.validEmail && 
							<p className="small red">Empty/Invalid Email field</p>
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
