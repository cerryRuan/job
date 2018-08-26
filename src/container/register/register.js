import React from 'react';
import Logo from '../../components/logo/logo';
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button,
	Radio,
	Toast
} from 'antd-mobile';
import {
	connect
} from 'react-redux';
import {
	register
} from '../../redux/user.redux';


@connect(state => state.user, {
	register
})
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: 'genius'
		};
		this.handleaClick = this.handleaClick.bind(this);
	}
	handleaClick() {
		let pwd = this.state.pwd;
		if (pwd.length < 6 || !isNaN(pwd)) {
			Toast.info('密码不能小于6位或者大于18位或者纯数字', 2);
		} else {
			this.props.register(this.state);
			setTimeout(() => {
				if (this.props.isAuth) {
					this.successToast();
				} else {
					this.failToast();
				}
			}, 100);
		}

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
		const errMsg = this.props.msg ? this.props.msg : '注册失败！';
		Toast.info(errMsg, 1);
	}
	goInfo() {
		setTimeout(() => {
			this.props.history.push(this.props.getRedireactPath);
		}, 1000);
	}
	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div className="Register">
			{this.props.getRedireactPath?this.goInfo():null}
				<Logo></Logo>
				<WhiteSpace size="lg"/>
				<List>
					<InputItem onChange={v=>this.handleChange('user', v)} type="texts">用户名</InputItem>
					<InputItem onChange={v=>this.handleChange('pwd', v)} type="password">密码</InputItem>
					<InputItem onChange={v=>this.handleChange('repeatpwd', v)} type="password">确认密码</InputItem>
				</List>
				<WhiteSpace/>
				<List>
				<RadioItem checked={this.state.type==="genius"} onChange={()=>this.handleChange('type', 'genius')}>牛人</RadioItem>
				<RadioItem checked={this.state.type==="boss"} onChange={()=>this.handleChange('type', 'boss')}>BOSS</RadioItem>
				</List>
				<WhiteSpace/>
				<WingBlank>
					<Button type="primary" onClick={this.handleaClick}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register;