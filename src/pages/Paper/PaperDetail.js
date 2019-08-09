import React from 'react'
import { List, Tag } from 'antd';
import service from '../../services/index'

class PaperDetail extends React.PureComponent {
  state = {
    questions: [],
    questionIds: []
  }

  componentDidMount() {
    const { questionIds } = this.props.record
    this.setState({ questionIds })
    service('getQuestion', { questionIds: JSON.parse(questionIds) }).then(res => {
      this.setState({ questions: res.data })
    })
  }

  componentDidUpdate() {
    const newQuestionIds = JSON.stringify(this.props.record.questionIds)
    const oldQuestionIds = JSON.stringify(this.state.questionIds)

    if (newQuestionIds !== oldQuestionIds) {
      const { questionIds } = this.props.record
      this.setState({ questionIds })
      service('getQuestion', { questionIds: JSON.parse(questionIds) }).then(res => {
        this.setState({ questions: res.data })
      })
    }
  }


  render() {
    const { questions } = this.state
    let questionType
    if (questions.questionType === 1) {
      questionType = '选择题'
    } else if (questions.questionType === 2) {
      questionType = '判断题'
    } else if (questions.questionType === 3) {
      questionType = '填空题'
    } else {
      questionType = '问答题'
    }
    const Title = question => (
      <div>
        <Tag color="geekblue">#{question.id} {questionType}</Tag>
        <a href={'/question/edit/' + question.id}>{question.questionStem}</a>
      </div>
    )
    const Content = question => (
      <div>
        题目答案: {question.questionAnswer}
      </div>
    )

    return (
      <List
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={Title(item)}
              description={Content(item)}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default PaperDetail