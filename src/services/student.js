// 获取待绑定学生
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E6%95%99%E5%B8%88%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#1-%E8%8E%B7%E5%8F%96%E5%BE%85%E7%BB%91%E5%AE%9A%E5%AD%A6%E7%94%9F
export const getMyStudents = {
  method: 'post',
  url: '/user/getMyStudents',
}

// 审核
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E6%95%99%E5%B8%88%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#1-%E8%8E%B7%E5%8F%96%E5%BE%85%E7%BB%91%E5%AE%9A%E5%AD%A6%E7%94%9F
export const review = {
  method: 'post',
  url: '/user/review',
}