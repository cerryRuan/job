import axios from 'axios';
import {
	getRedireactPath
} from '../util';

const ERROR_MSG = 'ERROR_MSG';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
	user: '',
	pwd: '',
	type: '',
	msg: '',
	isAuth: '',
	getRedireactPath: ''
}
export function user(state = initState, action) {
	switch (action.type) {
		case ERROR_MSG:
			return { ...state,
				isAuth: false,
				msg: action.msg
			}
		case REGISTER_SUCCESS:
			return { ...state,
				isAuth: true,
				getRedireactPath: getRedireactPath(action.payload),
				msg: '注册成功',
				...action.payload
			}
		case LOAD_DATA:
			return { ...state,
				...action.payload
			}
		case LOGIN_SUCCESS:
			return { ...state,
				isAuth: true,
				getRedireactPath: getRedireactPath(action.payload),
				msg: '登陆成功',
				...action.payload
			}
		default:
			return state;
	}
}



function registerSuccess(data) {
	return {
		type: REGISTER_SUCCESS,
		payload: data
	}
}

function loginSuccess(data) {
	return {
		type: LOGIN_SUCCESS,
		payload: data
	}
}

function errorMsg(msg) {
	return {
		msg,
		type: ERROR_MSG
	}
}
export function loadData(userinfo) {
	return {
		type: LOAD_DATA,
		payload: userinfo
	};
}

export function login({
	user,
	pwd
}) {
	if (!user || !pwd) {
		return errorMsg('用户名和密码不能为空');
	}
	return dispatch => {
		axios.post('/user/login ', {
			user,
			pwd
		}).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(loginSuccess(res.data.data))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function register({
	user,
	pwd,
	repeatpwd,
	type
}) {
	if (!user || !pwd || !type) {
		return errorMsg('用户名和密码不能为空');
	}
	if (pwd !== repeatpwd) {
		return errorMsg('密码和确认密码不相同');
	}
	return dispatch => {
		axios.post('/user/register', {
			user,
			pwd,
			type
}).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(registerSuccess({
					user,
					pwd,
					type
				}))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}