/**
 * 请求时token失效时，重新拉取token;
 * 同时把并发的失效请求储存,待新token拉取成功后 用newToken继续之前的请求
 */
import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import {getToken} from '@/utils/auth'

// 请求基本配置
const config = {
  timeout: 50000
}

const server = axios.create(config)

/* const loginUrl = 'https://xxxxxxxx' // 登录url
const isRefreshing = false // 是否正在刷新token
let callbacks = [] // 失效后同时发送请求的容器 -- 缓存接口

// 刷新 token 后, 将缓存的接口重新请求一次
function onAccessTokenFetched(newToken) {
  callbacks.forEach(callback => {
    callback(newToken)
  })
  // 清空缓存接口
  callbacks = []
}

// 添加缓存接口
function addCallbacks(callback) {
  callbacks.push(callback)
}*/

/**
 * 拦截
 */

// request interceptor
server.interceptors.request.use(
  config => {
    /*
       do something before request is sent
       let each request carry token
       ['X-Token'] is a custom headers key
       please modify it according to the actual situation
    */
    //  根据项目需求确定参数
    config.headers = {
      accessToken: store.state.user.token || '',
      imei: '',
      project: ''
    }
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
server.interceptors.response.use(
  response => {
    const res = response.data

    // 请求成功标识码
    let success_code = 0;

    console.log('server.interceptors.response :')
    console.log(res)
    return res

    if (res.code == success_code) {
      return res
    } else {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 2 * 1000
      })
      return res || 'Error'
    }
  },
  error => {
    Message({
      message: error || 'Error',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default server
