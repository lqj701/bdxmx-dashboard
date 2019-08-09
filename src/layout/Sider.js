import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Layout, Menu, Icon } from 'antd'
import './Sider.scss'

class SiderView extends React.Component {

  render() {
    const { collapsed } = this.props

    return (
      <Layout.Sider
        className='sider'
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Row className="logo" type="flex" justify="center" align="middle">
          {/* <Row>博达新梦想</Row> */}
          <Row>试题管理平台</Row>
        </Row>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['2', '3', '4']}>
          <Menu.Item key="1">
            <Link to='/'><Icon type="home" /><span>首页</span></Link>
          </Menu.Item>
          <Menu.SubMenu
            key="2"
            title={<span><Icon type="calculator" /><span>试题</span></span>}
          >
            <Menu.Item key="2-1"><Link to='/question/add'>添加试题</Link></Menu.Item>
            <Menu.Item key="2-2"><Link to='/question/list'>全部试题</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="3"
            title={<span><Icon type="file-done" /><span>试卷</span></span>}
          >
            <Menu.Item key="3-1"><Link to='/paper/add'>添加试卷</Link></Menu.Item>
            <Menu.Item key="3-2"><Link to='/paper/list'>全部试卷</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="4"
            title={<span><Icon type="user-add" /><span>学生</span></span>}
          >
            <Menu.Item key="4-1"><Link to='/student'>我的学生</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="5"
            title={<span><Icon type="calculator" /><span>关于</span></span>}
          >
            <Menu.Item key="5-1"><Link to='/help'>使用帮助</Link></Menu.Item>
            <Menu.Item key="5-2"><Link to='/changelog'>更新历史</Link></Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
    )
  }
}

export default SiderView