import React from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../redux/actions/user'
import { Layout, Icon } from 'antd'
import TopHeaderNav from '../components/TopHeaderNav'
import './Header.scss'

class HeaderView extends React.Component {
  render() {
    const { collapsed, toggleSider, user, userLogout } = this.props

    return (
      <Layout.Header className='header-view'>
        <Icon className='trigger' type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggleSider} />
        <TopHeaderNav user={user} userLogout={userLogout} />
      </Layout.Header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  userLogout,
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView)

export default ConnectedComponent