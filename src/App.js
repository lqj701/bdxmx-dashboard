import React from 'react';
import { LocaleProvider } from 'antd'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from "moment"
import rootReducer from './redux/reducers'
import RouterView from './routes/Router'
import './App.scss';
import "moment/locale/zh-cn"

const store = createStore(rootReducer)
moment.locale("zh-cn")

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <LocaleProvider locale={zhCN}>
            <RouterView />
          </LocaleProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
