import {connect} from 'react-redux';
import Header from '../components/header'
import {logout} from '../actions'

const mapStateToProps = state => ({
	currentUser:state.currentUser
})

const mapDispatchToProps = dispatch => ({
	logoutUser: ()=>{
		dispatch(logout())
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Header); 