import {connect} from 'react-redux';
import { Route,Redirect } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({component:Component,loginSuccessful, ...rest}) => {
	return(
		<Route
		{...rest}
		render = { () => loginSuccessful ? 
			(<Component />) : ( <Redirect to = {{pathname: "/login"}} /> )
      }
      />
	);
};

const mapStateToProps =  state => ({
	loginSuccessful:state.loginSuccessful
});

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);