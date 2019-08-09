import React from 'react'
import { Form, Icon, Input, Button, notification, Radio } from 'antd'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions/user'
import service from '../../services/index'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class Register extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          name: values.phone || '',
          avatarUrl: values.avatarUrl || '',
          email: values.email || '',
          gendar: values.gendar === 'female' ? true : false,
          type: 1
        }
        service('updateAccount', params).then(res => {
          if (res.code === 0) {
            this.props.history.push('/registe-result')
            notification.error({
              message: '提交成功',
              description: '账号信息已更新~',
            });
          } else {
            notification.error({
              message: '提交失败',
              description: res.message,
            });
          }
        })
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, },
      user,
    } = this.props

    // Only show error after a field is touched.
    const phoneError = isFieldTouched('phone') && getFieldError('phone')

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} style={{ width: '320px' }} >
        <FormItem
          {...formItemLayout}
          label={'手机号'}
          validateStatus={phoneError ? 'error' : 'success'}
          help={phoneError || ''}
        >
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [{ message: '请输入你的手机号!' }],
          })(
            <Input disabled label='手机号' prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'名字'}
        >
          {getFieldDecorator('name', {
            initialValue: user.name,
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="name" placeholder="名字" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'邮箱'}
        >
          {getFieldDecorator('email', {
            initialValue: user.email,
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱(可不填)" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'头像链接'}
        >
          {getFieldDecorator('avatarUrl', {
            initialValue: user.avatarUrl,
          })(
            <Input prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="头像链接(可不填)" />
          )}
        </FormItem>
        <Form.Item
          {...formItemLayout}
          label={'性别'}
        >
          {getFieldDecorator('gendar', {
            initialValue: user.gendar ? 'female' : 'male'
          })(
            <Radio.Group>
              <Radio.Button value="male">男</Radio.Button>
              <Radio.Button value="female">女</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{ float: 'right' }}
          >
            提交
          </Button>
        </FormItem>
      </Form>
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
)(Register)

export default withRouter(Form.create()(WrappedComponent))