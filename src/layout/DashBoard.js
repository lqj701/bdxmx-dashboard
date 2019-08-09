import React from 'react'
import { Layout, BackTop } from 'antd'
import HeaderView from './Header'
import SiderView from './Sider'
import ContentView from './Content'
import Copyright from '../components/Copyright'
import './DashBoard.scss'

class DashBoardView extends React.Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout className='app'>
        <SiderView collapsed={this.state.collapsed} />
        <Layout>
          <HeaderView toggleSider={this.toggle} collapsed={this.state.collapsed} />
          <ContentView>
            {this.props.render()}
          </ContentView>
          <Copyright />
        </Layout>
        <BackTop />
      </Layout>
    )
  }
}

export default DashBoardView