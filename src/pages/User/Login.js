import React from 'react'
import { Form, Icon, Input, Button, notification } from 'antd'
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions/user'
import service from '../../services/index'
import Entry from '../../layout/Entry'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class Login extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        service('userLogin', values).then(res => {
          if (res.code === 0) {
            const data = res.data
            this.props.updateUser({
              id: data.account.id,
              name: data.account.name,
              phone: data.account.phone,
              usable: data.account.usable,
              email: data.account.email,
              avatarUrl: data.account.avatarUrl,
              gender: data.account.gender,
              uid: data.uid,
              isLogin: true,
              type: data.teacher.type,
            })
            this.props.history.replace('/')
          } else {
            notification.error({
              message: '登录失败',
              description: res.message,
            });
          }
        })
      }
    })
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form

    // Only show error after a field is touched.
    const phoneError = isFieldTouched('phone') && getFieldError('phone')
    const passwordError = isFieldTouched('password') && getFieldError('password')
    return (
      <Entry>
        <Form onSubmit={this.handleSubmit} style={{ width: '320px' }} >
          <FormItem
            validateStatus={phoneError ? 'error' : 'success'}
            help={phoneError || ''}
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入你的手机号!' }],
            })(
              <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : 'success'}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入你的密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Link to='/register'>注册新用户</Link>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              style={{ float: 'right' }}
            >
              登录
          </Button>
          </FormItem>
        </Form>
      </Entry>
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

const WrappedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default withRouter(Form.create()(WrappedComponent))