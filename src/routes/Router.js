import React from 'react'
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { updateUser } from '../redux/actions/user'
import localStore from '../utils/localStore'
import asyncComponent from '../utils/asyncComponent'
import Login from '../pages/User/Login'

const DashBoardView = asyncComponent(() => import(/* webpackChunkName: 'DashBoardView' */'../layout/DashBoard'))
const Home = asyncComponent(() => import(/* webpackChunkName: 'Home' */'../pages/Home/Home'))
const Changelog = asyncComponent(() => import(/* webpackChunkName: 'Changelog' */'../pages/Changelog/Changelog'))
const Help = asyncComponent(() => import(/* webpackChunkName: 'Help' */'../pages/Help/Help'))
const Profile = asyncComponent(() => import(/* webpackChunkName: 'Profile' */'../pages/Profile/Profile'))
const PaperAdd = asyncComponent(() => import(/* webpackChunkName: 'PaperAdd' */'../pages/Paper/PaperAdd'))
const PaperList = asyncComponent(() => import(/* webpackChunkName: 'PaperList' */'../pages/Paper/PaperList'))
const QuestionAdd = asyncComponent(() => import(/* webpackChunkName: 'QuestionAdd' */'../pages/Question/QuestionAdd'))
const QuestionEdit = asyncComponent(() => import(/* webpackChunkName: 'QuestionEdit' */'../pages/Question/QuestionEdit'))
const QuestionList = asyncComponent(() => import(/* webpackChunkName: 'QuestionList' */'../pages/Question/QuestionList'))
const ResetPassword = asyncComponent(() => import(/* webpackChunkName: 'ResetPassword' */'../pages/Profile/ResetPassword'))
const Register = asyncComponent(() => import(/* webpackChunkName: 'Register' */'../pages/User/Register'))
const RegisteResult = asyncComponent(() => import(/* webpackChunkName: 'RegisteResult' */'../pages/User/RegisteResult'))
const Student = asyncComponent(() => import(/* webpackChunkName: 'Student' */'../pages/Student/Student'))
const Exception = asyncComponent(() => import(/* webpackChunkName: 'Exception' */'../pages/Exception/Exception'))

class RouterView extends React.Component {
  constructor(props) {
    super(props)
    if (localStore.get('isLogin') && localStore.get('user')) {
      this.props.updateUser(localStore.get('user'))
    }
  }

  checkAuth = Component => {
    return () => this.props.user.isLogin
      ? <DashBoardView render={() => <Component />}></DashBoardView>
      : <Redirect to='/login' />
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={this.checkAuth(Home)} />
        <Route exact path="/changelog" render={this.checkAuth(Changelog)} />
        <Route exact path="/help" render={this.checkAuth(Help)} />
        <Route exact path="/paper/add" render={this.checkAuth(PaperAdd)} />
        <Route exact path="/paper/list" render={this.checkAuth(PaperList)} />
        <Route exact path="/question/add" render={this.checkAuth(QuestionAdd)} />
        <Route exact path="/question/edit/:id" render={this.checkAuth(QuestionEdit)} />
        <Route exact path="/question/list" render={this.checkAuth(QuestionList)} />
        <Route exact path="/profile" render={this.checkAuth(Profile)} />
        <Route exact path="/student" render={this.checkAuth(Student)} />
        <Route exact path="/reset-password" render={this.checkAuth(ResetPassword)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/registe-result" component={RegisteResult} />
        <Route component={Exception} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  updateUser,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterView)

export default withRouter(ConnectedComponent)