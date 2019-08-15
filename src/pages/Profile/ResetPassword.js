import React from 'react'
import {Alert, Button, Form, Icon, Input, notification} from 'antd'
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {userLogout} from '../../redux/actions/user'
import service from '../../services/index'

const FormItem = Form.Item

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

class ResetPassword extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    password: values.password,
                    passwordTwo: values.password,
                    passwordNew: values.passwordNew,
                }
                service('updatePassword', params).then(res => {
                    if (res.code === 0) {
                        this.props.userLogout()
                        notification.success({
                            message: '修改密码成功，请重新登录',
                            duration: 10,
                        });
                    } else {
                        notification.error({
                            message: '重置密码失败',
                            description: res.message,
                        });
                    }
                })
            }
        })
    }

    render() {
        const {
            form: {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,},
        } = this.props

        // Only show error after a field is touched.
        const passwordError = isFieldTouched('password') && getFieldError('password')

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <div>
                <Alert
                    description="修改密码后需要重新登录。如果您忘记密码，请联系管理员。"
                    type="warning"
                />
                <Form onSubmit={this.handleSubmit} style={{width: '320px', marginTop: '40px'}}>
                    <FormItem
                        {...formItemLayout}
                        label={'原密码'}
                        validateStatus={passwordError ? 'error' : 'success'}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入你的原密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={'新密码'}
                        validateStatus={passwordError ? 'error' : 'success'}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('passwordNew', {
                            rules: [{required: true, message: '请输入你的新密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                            style={{float: 'right'}}
                        >
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    userLogout,
};

const WrappedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)

export default withRouter(Form.create()(WrappedComponent))