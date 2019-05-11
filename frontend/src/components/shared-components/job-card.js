import React from 'react';

import './stylesheets/job-card.css';

export default class SjobCard extends React.PureComponent {
	render(){

		let {
			title,
			description,
			experience,
			compensation,
			location,
			companyName,
			id,
			applied=false,
			onApplyClick
		} = this.props
		
		return(
			<div className="job-card padding-medium margin-medium"> 
				<br/>
				<b><h3 className="coral">{title}</h3></b>
				<h4 className="grey">{companyName}</h4>
				<br/>
				<p>{description}</p>
				<br className="hidden-md-down" />
				<div className="job-card-details">
				{
					experience &&
					<div className="job-card-experience padding-medium">
						<img src={require('../../local-data/images/experience.svg')} alt="experience-icon" height="20px" />
						<span className="medium">Experience : {experience}</span>
					</div>
				}
				{
					compensation &&
					<div className="job-card-compensation padding-medium">
						<img src={require('../../local-data/images/compensation.svg')} alt="compensation-icon" height="20px" />
						<span className="medium">Compensation : {compensation}</span>
					</div>
				}
				{
					location &&
					<div className="job-card-location padding-medium">
						<img src={require('../../local-data/images/location.svg')} alt="location-icon" height="20px" />
						<span className="medium">Location : {location}</span>
					</div>
				}
				</div>
				<br />
				<div className="job-card-apply">
					<center>
						{
							!applied &&
							<button onClick={()=>{onApplyClick(id)}}> Apply </button>
						}
						{
							applied&&
							<button disabled> Applied Successfully! </button>
						}
					</center>
				</div>
			</div>
		)
	}
}