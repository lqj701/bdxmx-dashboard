import React from 'react';
import loadable from 'react-loadable';
import { Spin } from 'antd';

const Loading = () => (
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <Spin />
  </div>
)

export default function asyncComponent(loader) {
  return loadable({ loader, loading: Loading });
}
