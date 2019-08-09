import React from 'react'
import { Layout } from 'antd'
import UpdateNews from '../components/UpdateNews'
import { withRouter } from "react-router";
import './Content.scss'

class ContentView extends React.Component {
  render() {
    const { children } = this.props

    return (
      <Layout className='content-view'>
        <Layout.Header className='content-header'>
          <UpdateNews />
        </Layout.Header>
        <Layout.Content className='content'>
          {children}
        </Layout.Content>
      </Layout>
    )
  }
}

export default withRouter(ContentView)