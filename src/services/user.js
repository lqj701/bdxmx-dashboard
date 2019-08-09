// 登录
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#4-%E7%99%BB%E5%BD%95%E6%8E%A5%E5%8F%A3
export const userLogin = {
  method: 'post',
  url: '/user/login',
}

// 注册
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#1-%E6%B3%A8%E5%86%8C%E6%8E%A5%E5%8F%A3
export const registeUser = {
  method: 'post',
  url: '/user/register',
}

// 更新密码
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#3-%E9%87%8D%E7%BD%AE%E5%AF%86%E7%A0%81%E6%8E%A5%E5%8F%A3
export const updatePassword = {
  method: 'post',
  url: '/api/user/updatePassword',
}

// 更新账号
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#2-%E6%9B%B4%E6%96%B0%E8%B4%A6%E6%88%B7%E4%BF%A1%E6%81%AF%E6%8E%A5%E5%8F%A3
export const updateAccount = {
  method: 'post',
  url: '/api/user/updateAccount',
}