import React from 'react';
import Logo from '../../components/logo/logo';
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button,
	Toast
} from 'antd-mobile';
import {
	login
} from '../../redux/user.redux';
import {
	connect
} from 'react-redux';

@connect(state => state.user, {
	login
})
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: ''
		}
		this.handleaClick = this.handleaClick.bind(this);
		this.register = this.register.bind(this);
	}
	register() {
		this.props.history.push('/register');
	}
	handleaClick() {
		this.props.login(this.state);
		setTimeout(() => {
			if (this.props.isAuth) {
				this.successToast();
			} else {
				this.failToast();
			}
		}, 50);
	}
	handleChange(key, value) {
		this.setState({
			[key]: value
		});
	}
	successToast() {
		Toast.success(this.props.msg, 1);
	}
	failToast() {
		const errMsg = this.props.msg ? this.props.msg : '登陆失败！';
		Toast.info(errMsg, 1);
	}
	goInfo() {
		setTimeout(() => {
			this.props.history.push(this.props.getRedireactPath);
		}, 1000);
	}
	render() {
		return (
			<div className="login">
			{this.props.getRedireactPath?this.goInfo():null}
				<Logo></Logo>
				<WhiteSpace size="lg"/>
				<List>
					<InputItem onChange={v=>this.handleChange('user', v)} type="text">用户</InputItem>
					<InputItem onChange={v=>this.handleChange('pwd', v)} type="password">密码</InputItem>
				</List>
				<WhiteSpace/>
				<WingBlank>
					<Button type="primary" onClick={this.handleaClick}>登陆</Button>
					<WhiteSpace/>
					<Button type="primary" onClick={this.register}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login;