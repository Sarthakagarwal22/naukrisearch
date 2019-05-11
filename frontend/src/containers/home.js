import {connect} from 'react-redux';

import { updateJobsArray, updateJobIdCurrentUser } from '../actions'

import Home from '../components/home'

const mapStateToProps = state => ({
	jobsArray : state.jobsArray,
	deletedPostsArray: state.deletedPostsArray,
	currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
	setJobsArray: (jobs) => {
		dispatch(updateJobsArray(jobs))
	},
	addJobIdToCurrentUser: (jobId) => {
		dispatch(updateJobIdCurrentUser(jobId))
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)