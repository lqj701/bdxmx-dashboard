import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Dropdown, Avatar, notification } from 'antd'
import { randomPick } from '../../utils/random'
import './index.scss'

notification.config({
  placement: 'bottomRight',
});

class HeaderNav extends React.Component {
  render() {
    const UserButtonMenu = () => {
      const handleClick = ({ key }) => {
        if (key === '3') {
          this.props.userLogout()
        }
      }
      return (
        <Menu onClick={handleClick}>
          <Menu.Item key='1'>
            <Link to='/profile'>我的资料</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/reset-password'>重置密码</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            退出登录
          </Menu.Item>
        </Menu>
      )
    }

    const UserButton = ({ user }) => {
      const sayHello = () => {
        const description = [
          '开心每一天',
          '今天也要加油啊',
          '喜欢看你努力的样子',
        ]
        notification.open({
          message: 'Hi ' + user.name + '!',
          description: randomPick(description)
        });
      };

      return user.isLogin
        ? <Dropdown className='header-nav-item' overlay={UserButtonMenu()} onClick={sayHello}>
          <div className='dropdown-title'>
            <Avatar size={32} icon="user" style={{ marginRight: '6px' }} />
            {user.name}
          </div>
        </Dropdown>
        : <div className='header-nav-item dropdown-title'>
          <Avatar size={32} icon="user" style={{ marginRight: '6px' }} />
          未登陆
          </div>
    }

    return (
      <div className='header-nav'>
        <UserButton user={this.props.user} />
      </div>
    )
  }
}

export default withRouter(HeaderNav)