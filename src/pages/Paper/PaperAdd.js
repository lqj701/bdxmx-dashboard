import React from 'react'
import { Row, Form, Input, Button, message, Select } from 'antd'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import service from '../../services/index'

const FormItem = Form.Item
const Option = Select.Option

class PaperAdd extends React.Component {

  state = {
    questionType1: [],
    questionType2: [],
    questionType3: [],
    questionType4: [],
  }

  componentDidMount() {
    this.getQuestionList()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      values.questionType1 = values.questionType1 ? values.questionType1 : []
      values.questionType2 = values.questionType2 ? values.questionType2 : []
      values.questionType3 = values.questionType3 ? values.questionType3 : []
      values.questionType4 = values.questionType4 ? values.questionType4 : []
      const questionIds = [
        ...values.questionType1,
        ...values.questionType2,
        ...values.questionType3,
        ...values.questionType4,
      ]
      if (err) return
      const params = {
        paperType: this.props.user.type,
        name: values.name,
        questionIds: questionIds,
        totalScore: values.totalScore
      }
      this.addPaper(params)
    })
  }

  getQuestionList = (params = { page: 1, row: 99999 }) => {
    service('getQuestionsForTeacher', params).then(res => {
      if (res.code === 0) {
        let questionType1 = [], questionType2 = [], questionType3 = [], questionType4 = []
        res.data.forEach(o => {
          o.id = String(o.id)
          if (o.questionType === 1) {
            questionType1.push(o)
          } else if (o.questionType === 2) {
            questionType2.push(o)
          } else if (o.questionType === 3) {
            questionType3.push(o)
          } else {
            questionType4.push(o)
          }
        })
        this.setState({
          questionType1,
          questionType2,
          questionType3,
          questionType4,
        })
      } else {
        message.error('获取试题数据失败...请联系管理员')
      }
    })
  }

  addPaper = params => {
    service('addPaper', params).then(res => {
      if (res.code === 0) {
        message.success('添加试卷成功，即将前往试题列表页', 1).then(() => {
          this.props.history.push('/paper/list')
        })
      } else {
        message.error('添加试卷失败，请重试或联系管理员')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { questionType1, questionType2, questionType3, questionType4 } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <Row type="flex" justify="center" align="middle">
        <Form onSubmit={this.handleSubmit} style={{ width: '80%', maxWidth: '800px' }} >
          <FormItem
            {...formItemLayout}
            label="试卷名"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true }],
            })(
              <Input placeholder="请输入试卷名" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="选择题"
          >
            {getFieldDecorator('questionType1', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={questionType1.length ? "请选择选择题" : '暂无选择题'}
                disabled={!questionType1.length}
              >
                {questionType1.map(i => (
                  <Option key={i.id}>{i.id}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="填空题"
          >
            {getFieldDecorator('questionType2', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={questionType2.length ? "请选择填空题" : '暂无填空题'}
                disabled={!questionType2.length}
              >
                {questionType2.map(i => (
                  <Option key={i.id}>{i.id}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="问答题"
          >
            {getFieldDecorator('questionType3', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={questionType3.length ? "请选择问答题" : '暂无问答题'}
                disabled={!questionType3.length}
              >
                {questionType3.map(i => (
                  <Option key={i.id}>{i.id}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="判断题"
          >
            {getFieldDecorator('questionType4', {})(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={questionType4.length ? "请选择判断题" : '暂无判断题'}
                disabled={!questionType4.length}
              >
                {questionType4.map(i => (
                  <Option key={i.id}>{i.id}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="试卷总分"
          >
            {getFieldDecorator('totalScore', {
              initialValue: 100,
              rules: [{ required: true }],
            })(
              <Input placeholder="输入试卷的总分" type='number' />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: 'right' }}
            >
              提交
            </Button>
          </FormItem>
        </Form>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const WrappedComponent = connect(
  mapStateToProps,
)(PaperAdd)

export default withRouter(Form.create()(WrappedComponent))