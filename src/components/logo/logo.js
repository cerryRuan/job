import React from 'react';
import logoimg from './job.png';
import './logo.scss';

class Register extends React.Component{
	render(){
		return(
			<div className="logo-container">
				<img className="logo" src={logoimg} alt="logo图片"/>
			</div>
		)
	}
}

export default Register;