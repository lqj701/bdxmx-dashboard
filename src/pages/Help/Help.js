import React from 'react'
import { Collapse } from 'antd'

const Panel = Collapse.Panel;

const text1 = (
  <div>
    登录时需要用到您的手机号和密码，请牢记。如果需要修改请<a href='/reset-password'>点击这里</a>。
    <br /><br />
    为了防止人为篡改密码，忘记请联系管理员~
  </div>
)
const text2 = (
  <div>
    本系统共支持四种题型：选择题，填空题，判断题，问答题。
  </div>
)
const text3 = (
  <div>
    试卷中可以挑选你想要的试题，添加题目ID的时候注意要加 <b>中括号</b> 哦
  </div>
)
const text4 = (
  <div>
    为了确保网站的安全，答题系统使用了非常严密的校验机制，浏览器会出现偶然的无法响应的情况，如果您不幸遇到这种情况，请做如下操作:
    <br /><br />
    1. 清空浏览器缓存
    <br /><br />
    2. 重启浏览器(推荐使用 chrome 浏览器)
    <br /><br />
    3. 重新打开网站并使用 Ctrl + R 强制刷新
    <br /><br />
    4. 如果网站还是没有恢复请联系我们的专业技术人员
  </div>
)

class Help extends React.Component {
  render() {
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header="账号相关" key="1">
          {text1}
        </Panel>
        <Panel header="试题相关" key="2">
          {text2}
        </Panel>
        <Panel header="试卷相关" key="3">
          {text3}
        </Panel>
        <Panel header="网站出问题了？" key="4">
          {text4}
        </Panel>
      </Collapse>
    )
  }
}

export default Help