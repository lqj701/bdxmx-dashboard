import React from 'react'
import { Row } from 'antd'
import './index.scss'

const Copyright = () => {
  return (
    <Row type="flex" justify="center" align="middle" className='copyright'>
      Made with&nbsp;<span role="img" aria-label='power'>⚡️</span>&nbsp;by Saiyan
    </Row>
  )
}

export default Copyright