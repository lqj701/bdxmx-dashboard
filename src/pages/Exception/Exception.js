import React from 'react'
import { Row, Col } from 'antd';

class Exception extends React.Component {

  render() {
    const {
      errorType,
    } = this.props

    return (
      <Row>
        <Col>{errorType} Error: aa</Col>
      </Row>
    )
  }
}

export default Exception