// 获取试题
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#1-%E8%8E%B7%E5%8F%96%E8%AF%95%E9%A2%98%E6%8E%A5%E5%8F%A3
export const getQuestionsForTeacher = {
  method: 'post',
  url: '/paper/getQuestionsForTeacher',
}

// 添加试卷
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#2-%E6%B7%BB%E5%8A%A0%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3
export const addPaper = {
  method: 'post',
  url: '/paper/add',
}

// 更新试卷
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#3-%E6%9B%B4%E6%96%B0%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3
export const updatePaper = {
  method: 'post',
  url: '/paper/update',
}

// 删除试卷
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#4-%E5%88%A0%E9%99%A4%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3
export const deletePaper = {
  method: 'post',
  url: '/paper/delete',
}

// 获取试卷
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#5-%E8%8E%B7%E5%8F%96%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3
export const getPaper = {
  method: 'post',
  url: '/paper/get',
}

// 获取试卷列表
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#6-%E8%8E%B7%E5%8F%96%E8%AF%95%E5%8D%B7%E5%88%97%E8%A1%A8%E6%8E%A5%E5%8F%A3
export const getPaperList = {
  method: 'post',
  url: '/paper/getList',
}