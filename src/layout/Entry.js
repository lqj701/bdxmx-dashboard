import React from 'react'
import { Row } from 'antd';
import './Entry.scss'

class EntryView extends React.Component {
  render() {
    return (
      <div className='entry'>
        <Row className='header' type="flex" justify="center" align="middle">
          <div className='title'>博达新梦想</div>
        </Row>
        <Row className='form'>
          {this.props.children}
        </Row>
      </div>
    )
  }
}

export default EntryView