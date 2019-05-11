import { connect } from 'react-redux';
import { currentUser,loginSuccessful } from '../actions';
import Register from '../components/register';
import history from '../history'

const mapStatetoProps = state => ({
	loginSuccessful: state.loginSuccessful
});
const mapDispatchtoProps = dispatch => ({
	successfulLogin : (userProfile) =>{
		dispatch(loginSuccessful());
		dispatch(currentUser(userProfile))
		history.push("/home");
	}
});
export default connect (mapStatetoProps,mapDispatchtoProps)(Register);