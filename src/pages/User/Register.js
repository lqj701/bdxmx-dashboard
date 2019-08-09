import React from "react";
import { Form, Icon, Input, Button, notification, Radio } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions/user";
import service from "../../services/index";
import Entry from "../../layout/Entry";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Register extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          phone: values.phone,
          name: values.name || "",
          avatarUrl: values.avatarUrl || "",
          email: values.email || "",
          gendar: values.gendar === "female" ? true : false,
          password: values.password || "",
          type: 1
        };
        service("registeUser", params).then(res => {
          if (res.code === 0) {
            this.props.history.push("/registe-result");
          } else {
            notification.error({
              message: "注册失败",
              description: res.message
            });
          }
        });
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const phoneError = isFieldTouched("phone") && getFieldError("phone");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <Entry>
        <Form onSubmit={this.handleSubmit} style={{ width: "320px" }}>
          <FormItem
            validateStatus={phoneError ? "error" : "success"}
            help={phoneError || ""}
          >
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入你的手机号!" }]
            })(
              <Input
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="手机号"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("name", {})(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="name"
                placeholder="名字"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {})(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="邮箱(可不填)"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("avatarUrl", {})(
              <Input
                prefix={
                  <Icon type="picture" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="头像链接(可不填)"
              />
            )}
          </FormItem>
          <Form.Item>
            {getFieldDecorator("gendar", { initialValue: "male" })(
              <Radio.Group>
                <Radio.Button value="male">男</Radio.Button>
                <Radio.Button value="femle">女</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <FormItem
            validateStatus={passwordError ? "error" : "success"}
            help={passwordError || ""}
          >
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入你的密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            <Link to="/login">去登录</Link>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              style={{ float: "right" }}
            >
              提交
            </Button>
          </FormItem>
        </Form>
      </Entry>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  updateUser
};

const WrappedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default withRouter(Form.create()(WrappedComponent));
