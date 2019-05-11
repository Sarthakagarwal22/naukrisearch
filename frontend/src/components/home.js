import React from 'react';

import SjobCard from './shared-components/job-card'

// import {getRequest} from '../helpers/api-response'

// import {fetchJobsUrl} from '../local-data/config'
import {jobListing} from '../local-data/stub-response'

// import history from '../history'

import './stylesheets/home.css'

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			showLoader:false,
			jobsArray:[],
			showAvailableJobs:true,
			showAppliedJobs:false,
			showToast:false
		}
		this.applied = null;
		this.available = null;
		this.fetchJobs = this.fetchJobs.bind(this);
		this.searchPosts = this.searchPosts.bind(this);
		this.toggleAvailableApplied = this.toggleAvailableApplied.bind(this);
		this.onApplyClick = this.onApplyClick.bind(this);
	}

	searchPosts(searchPhrase){
		if(searchPhrase.length === 0){
			this.setState({jobsArray:this.props.jobsArray})
		}
		else{
			console.log(this.props.jobsArray)
			var filteredArrayAfterSearch = this.props.jobsArray.filter((job)=> ((job.job_role.indexOf(searchPhrase)!== -1) || (job.description.indexOf(searchPhrase)!== -1) ))
			this.setState({jobsArray:filteredArrayAfterSearch})
		}
	}

	// async fetchJobs(){
	// 	this.setState({showLoader:true});
	// 	var jobs = await getRequest(fetchJobsUrl);
	// 	this.setState({showLoader:false, jobsArray:jobs})
	// 	this.props.setPostsArray(posts);
	// }

	onApplyClick(jobId){
		this.props.addJobIdToCurrentUser(jobId)
		this.setState({showToast:true})
		setTimeout(()=>{
			this.setState({showToast:false})
		},500)
	}

	toggleAvailableApplied(){
		if("available-clicked" && !this.state.showAvailableJobs){
			this.available.classList.add("home-available-applied-toggle-active");
			this.applied.classList.remove("home-available-applied-toggle-active");
			this.setState({showAvailableJobs:true,showAppliedJobs:false})
		}
		else if("applied-clicked" && !this.state.showAppliedJobs){
			this.available.classList.remove("home-available-applied-toggle-active");
			this.applied.classList.add("home-available-applied-toggle-active");
			this.setState({showAvailableJobs:false,showAppliedJobs:true})
		}
	}

	fetchJobs(){
		this.setState({showLoader:true});
		setTimeout(()=>{
			var jobs = jobListing;
			this.setState({showLoader:false, jobsArray:jobs})
			this.props.setJobsArray(jobs)		
		},1000)
	}

	componentDidMount(){
		if(this.props.jobsArray.length === 0)
			this.fetchJobs();
		else
			this.setState({jobsArray:this.props.jobsArray})
	}

	render(){
		let{
			currentUser
		} = this.props
		console.log(currentUser)
		return(
			<div className="home-container">
				<div className="white home-hero-banner">
					<div className="home-hero-banner-pattern"></div>
					<h2>Welcome to Naukri Search!</h2>
					<br />
					<h3>Find the best jobs, from all around the world.</h3> 
					<h5 className="hidden-md-dowm">All at one place</h5>
					<br />
					<input className="home-search-bar" type="text" placeholder="Search for your favourite jobs" onChange={(e)=>{this.searchPosts(e.target.value)}}/>
				</div>
			<br />
			<div className="home-available-applied-toggle">
				<div className="home-available-toggle">
					<p ref={node => {this.available = node}} className="clickable home-available-applied-toggle-active padding-medium" onClick={()=>{this.toggleAvailableApplied("available-clicked")}}>Available</p>
				</div>
				<div className="home-applied-toggle">
					<p ref={node => {this.applied = node}} className="clickable padding-medium" onClick={()=>{this.toggleAvailableApplied("applied-clicked")}}>Applied</p>
				</div>
			</div>
			<div>
				{
					this.state.showAvailableJobs &&
					<div className="home-job-available-container">
						<br />
					{
						this.state.showLoader &&
						<h2>Loading...</h2>
					}
					{
						!this.state.showLoader &&
						this.state.jobsArray.map(job => {
							if(currentUser.jobIds.indexOf(job.id)===-1)
							return(
								<SjobCard 
								key = {job.id} 
								title = {job.job_role} 
								description = {job.description} 
								compensation = {job.compensation}
								experience = {job.experience}
								id = {job.id}
								companyName = {job.company_name}
								location = {job.location}
								onApplyClick = {this.onApplyClick}
							/>
							)
							return null
						})
					}
					</div>
				}
			</div>
			<div>
				{
					this.state.showAppliedJobs && 
					<div className="home-job-applied-container">
						<br />
					{
						this.state.showLoader &&
						<h2>Loading...</h2>
					}
					{
						!this.state.showLoader &&
						this.state.jobsArray.map(job => {
							if(currentUser.jobIds.indexOf(job.id)!==-1)
							return(
								<SjobCard 
								key = {job.id} 
								title = {job.job_role} 
								description = {job.description} 
								compensation = {job.compensation}
								experience = {job.experience}
								id = {job.id}
								companyName = {job.company_name}
								location = {job.location}
								applied = {true}
							/>
							)
							return null
						})
					}
					</div>
				}
			</div>
			<div className={`toast ${this.state.showToast ? " show": ""}`}> Applied Successfully!</div>
			</div>
		)
	}
}