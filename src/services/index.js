import axios from 'axios'
import { message } from 'antd'
import localStore from '../utils/localStore'
import * as userApis from './user'
import * as paperApis from './paper'
import * as questionApis from './question'
import * as studentApis from './student'

const apis = {
  ...userApis,
  ...paperApis,
  ...questionApis,
  ...studentApis,
}

const instance = axios.create({
  baseURL: 'https://api.bdxmx.com/api',
  timeout: 5000,
  headers: {
    uid: ''
  }
})

function service(name, data) {
  const apiConfig = apis[name]
  const user = localStore.get('user')
  const uid = user ? user.uid : ''

  return new Promise((resolve, reject) => {
    instance({
      data,
      headers: {
        uid,
      },
      ...apiConfig,
    }).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        message.error('抱歉网站出现问题了，工程师在抢救中...');
        reject(res)
      }
    }).catch(err => {
      message.error('抱歉网站出现问题了，工程师在抢救中...');
      reject(err)
    })
  })
}

export default service