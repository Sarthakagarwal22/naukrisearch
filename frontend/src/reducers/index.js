import { combineReducers } from 'redux';
// import history from '../history'

const loginSuccessful = (state=false,action) => {
  switch(action.type){
    case 'LOGIN_SUCCESSFUL':
      return true
    case 'LOGIN_UNSUCCESSFUL':
      return false
    case 'LOGOUT':
      return false
    default :
      return state
  }
}

const jobsArray = (state=[],action) => {
  switch(action.type){
    case 'UPDATE_JOBS_ARRAY':
      return action.jobs
    default :
      return state
  }
}

const currentUser = (state={},action) => {
  switch(action.type){
    case 'CURRENT_USER':
      return action.user
    case 'UPDATE_JOB_ID_CURRENT_USER':
      var currentUser = state;
      currentUser.jobIds.unshift(action.jobId)
      return currentUser
    default :
      return state
  }
}

const globalFunctions = combineReducers({
  loginSuccessful,
  jobsArray,
  currentUser
});

export default globalFunctions;