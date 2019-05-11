import { connect } from 'react-redux';
import { currentUser,loginSuccessful,loginUnsuccessful } from '../actions';
import Login from '../components/login';
import history from '../history'

const mapStatetoProps = state => ({
	loginSuccessful: state.loginSuccessful
});
const mapDispatchtoProps = dispatch => ({
	successfulLogin : (userProfile) =>{
		dispatch(loginSuccessful());
		dispatch(currentUser(userProfile))
		history.push("/home");
	},
	unsuccessfulLogin : ()=>{dispatch(loginUnsuccessful())},
	reset: () => {
		dispatch(loginSuccessful())
	}
});
export default connect (mapStatetoProps,mapDispatchtoProps)(Login);