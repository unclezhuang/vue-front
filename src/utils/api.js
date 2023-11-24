import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.3.8:8000/api'

// 获取登录页的信息
export const apiLogin = params => axios.post('sys/login', {params: params})

// 获取验证码
export const apiCaptcha = params => axios.get('sys/captcha', {params: params})

// 获取日志信息
export const apiLog = params => axios.post('sys/log', params)

// 更新密码，待完成
export const systemUserChangePassword = params => null


// 获取用户信息
export const apiUsers = params => axios.post('db/spiderUsers', params)

// 任务数据
export const apiSpiderTask = params => axios.post('task/spiderTask', params)
export const apiTaskType = params => axios.get('task/getTaskType')
export const apiTaskStatus = params => axios.get('task/getTaskStatus')