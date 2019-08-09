import React from 'react'
import { Row, Col, Alert } from 'antd'
import './Home.scss'

class Home extends React.Component {
  render() {
    return (
      <Row>
        <Alert message="欢迎来到 博达新梦想专业试题系统~" type="success" />
        <Col></Col>
      </Row>
    )
  }
}

export default Home