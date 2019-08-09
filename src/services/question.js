// 添加题目
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E9%A2%98%E5%BA%93%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#1-%E6%B7%BB%E5%8A%A0%E9%A2%98%E7%9B%AE%E6%8E%A5%E5%8F%A3
export const addQuestion = {
  method: 'post',
  url: '/question/add',
}

// 更新题目
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E9%A2%98%E5%BA%93%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#2-%E6%9B%B4%E6%96%B0%E9%A2%98%E7%9B%AE%E6%8E%A5%E5%8F%A3
export const updateQuestion = {
  method: 'post',
  url: '/question/update',
}

// 删除题目
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E9%A2%98%E5%BA%93%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#3-%E5%88%A0%E9%99%A4%E9%A2%98%E7%9B%AE%E6%8E%A5%E5%8F%A3
export const deleteQuestion = {
  method: 'post',
  url: '/question/delete',
}

// 查询题目
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E9%A2%98%E5%BA%93%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#4-%E6%9F%A5%E8%AF%A2%E9%A2%98%E7%9B%AE%E6%8E%A5%E5%8F%A3
export const getQuestion = {
  method: 'post',
  url: '/question/get',
}

// 获得题目列表
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E9%A2%98%E5%BA%93%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#5-%E8%8E%B7%E5%BE%97%E9%A2%98%E7%9B%AE%E5%88%97%E8%A1%A8
export const getQuestionList = {
  method: 'post',
  url: '/question/getList',
}

// 文件上传
export const multiFileUpload = {
  method: 'post',
  url: '/question/getList'
};