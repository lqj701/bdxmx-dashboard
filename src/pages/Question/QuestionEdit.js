import React from 'react'
import { Row, Form, Button, message } from 'antd'
import { withRouter } from "react-router-dom";
import service from '../../services/index'
import { ChoiceQuestion, CompletionQuestion, AnswerQuestion, JudgementQuestion } from './QuestionType'

const FormItem = Form.Item

class QuestionEdit extends React.Component {
  state = {
    data: {},
  }

  componentDidMount() {
    this.getQuestion()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return

      let questionAudio = []
      if (values.audio) {
        questionAudio = values.audio.file.response.data.reduce((prev, cur) => {
          prev.push(cur.url)
          return prev
        }, [])
      }

      const params = {
        questionId: this.props.match.params.id,
        stem: values.questionStem,
        answer: values.questionAnswer,
        point: values.point,
        questionType: this.state.questionType, //1：选择；2：判断；3：填空；4：解答
        questionChoice: { A: values.optionA, B: values.optionB, C: values.optionC, D: values.optionD },
        questionAudio: JSON.stringify({ address: questionAudio }),
      }
      this.updateQuestion(params)
    })
  }

  updateQuestion = params => {
    service('updateQuestion', params).then(res => {
      if (res.code === 0) {
        message.success('更新试题成功')
      } else {
        message.error('更新试题成功,请重试或联系管理员')
      }
    })
  }

  getQuestion = () => {
    const id = Number(this.props.match.params.id)
    service('getQuestion', { questionIds: [id] }).then(res => {
      if (res.code === 0 && res.data.length === 1) {
        const data = {
          questionAudio: JSON.parse(res.data[0].questionAudio).address,
          ...res.data[0],
          ...JSON.parse(res.data[0].questionChoice),
        }
        this.setState({ data })
      } else {
        message.error('无法获取试题，即将返回试题列表', 1).then(() => {
          this.props.history.push('/question/list')
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { data } = this.state

    let detail
    if (data.questionType === 1) {
      detail = <ChoiceQuestion getFieldDecorator={getFieldDecorator} initValue={data} />
    } else if (data.questionType === 2) {
      detail = <JudgementQuestion getFieldDecorator={getFieldDecorator} initValue={data} />
    } else if (data.questionType === 3) {
      detail = <CompletionQuestion getFieldDecorator={getFieldDecorator} initValue={data} />
    } else {
      detail = <AnswerQuestion getFieldDecorator={getFieldDecorator} initValue={data} />
    }

    return (
      <Row type="flex" justify="center" align="middle">
        <Form onSubmit={this.handleSubmit} style={{ width: '80%', maxWidth: '800px' }} >
          {detail}
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

export default withRouter(Form.create()(QuestionEdit))