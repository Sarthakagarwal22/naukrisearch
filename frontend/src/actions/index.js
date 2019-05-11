export const loginSuccessful = () => ({
	type: 'LOGIN_SUCCESSFUL',
});

export const loginUnsuccessful = () => ({
	type: 'LOGIN_UNSUCCESSFUL',
});

export const logout = () => ({
	type: 'LOGOUT'
})

export const updateJobsArray = (jobs) => ({
	type:'UPDATE_JOBS_ARRAY',
	jobs
})

export const currentUser = (user) => ({
	type: 'CURRENT_USER',
	user
})

export const updateJobIdCurrentUser = (jobId) => ({
	type: 'UPDATE_JOB_ID_CURRENT_USER',
	jobId
})