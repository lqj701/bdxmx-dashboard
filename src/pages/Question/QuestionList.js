import React from 'react'
import { List, Divider, Row, Tag, Card, Icon, message } from 'antd';
import { withRouter } from "react-router-dom";
import service from '../../services/index'

class QuestionList extends React.Component {
  state = {
    listData: [],
  }

  componentDidMount() {
    this.getQuestionList()
  }

  getQuestionList = (params = { page: 1, row: 12 }) => {
    service('getQuestionList', params).then(res => {
      if (res.code === 0) {
        let listData = res.data.map(o => ({
          ...o,
          href: `/question/edit/${o.id}`
        }))
        this.setState({ listData })
      } else {
        message.error('获取数据失败...请联系管理员')
      }
    })
  }

  deleteQuestion = id => {
    service('deleteQuestion', { questionIds: [id] }).then(res => {
      if (res.code === 0) {
        message.success('试题删除成功！');
        this.getQuestionList()
      } else {
        message.error('试题删除失败，请重试或联系管理员');
      }
    })
  }

  render() {
    const { listData } = this.state;
    const IconText = ({ type, text, item }) => {
      const handleClick = () => {
        if (type === 'edit') {
          this.props.history.push(item.href)
        } else {
          this.deleteQuestion(item.id)
        }
      }
      return (
        <div onClick={handleClick}>
          <Icon type={type} style={{ marginRight: 6 }} />
          {text}
        </div>
      )
    }

    const ChoiceQuestion = item => (
      <React.Fragment>
        <Row>
          <Divider><Tag color="geekblue">#{item.id} 选择题</Tag></Divider>
          {item.questionStem}
        </Row>
        < Row >
          <Divider><Tag.CheckableTag>选项</Tag.CheckableTag></Divider>
          {item.questionChoice}
        </Row>
        <Row>
          <Divider><Tag.CheckableTag>答案 & 分值</Tag.CheckableTag></Divider>
          {item.questionAnswer}
          <Divider type="vertical" />
          {item.point}
        </Row>
      </React.Fragment>
    )

    const JudgementQuestion = item => (
      <React.Fragment>
        <Row>
          <Divider><Tag color="geekblue">#{item.id} 判断题</Tag></Divider>
          {item.questionStem}
        </Row>
        <Row>
          <Divider><Tag.CheckableTag>答案 & 分值</Tag.CheckableTag></Divider>
          {item.questionAnswer}
          <Divider type="vertical" />
          {item.point}
        </Row>
      </React.Fragment>
    )

    const CompletionQuestion = item => (
      <React.Fragment>
        <Row>
          <Divider><Tag color="geekblue">#{item.id} 填空题</Tag></Divider>
          {item.questionStem}
        </Row>
        <Row>
          <Divider><Tag.CheckableTag>答案 & 分值</Tag.CheckableTag></Divider>
          {item.questionAnswer}
          <Divider type="vertical" />
          {item.point}
        </Row>
      </React.Fragment>
    )

    const AnswerQuestion = item => (
      <React.Fragment>
        <Row>
          <Divider><Tag color="geekblue">#{item.id} 问答题</Tag></Divider>
          {item.questionStem}
        </Row>
        <Row>
          <Divider><Tag.CheckableTag>答案 & 分值</Tag.CheckableTag></Divider>
          {item.questionAnswer}
          <Divider type="vertical" />
          {item.point}
        </Row>
      </React.Fragment>
    )

    const Content = ({ item }) => {
      let detail
      if (item.questionType === 1) {
        detail = ChoiceQuestion(item)
      } else if (item.questionType === 2) {
        detail = JudgementQuestion(item)
      } else if (item.questionType === 3) {
        detail = CompletionQuestion(item)
      } else {
        detail = AnswerQuestion(item)
      }
      return (
        <Card
          actions={[<IconText type='edit' text='编辑' item={item} />, <IconText type='delete' text='删除' item={item} />]}
        >
          {detail}
        </Card >
      )
    }

    return (
      <List
        grid={{
          gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4,
        }}
        pagination={{
          onChange: (page) => {
            this.getQuestionList({ page: page, row: 12 })
          },
          pageSize: 12,
          total: 240,
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item key={item.id}>
            <Content item={item} />
          </List.Item>
        )}
      />
    )
  }
}

export default withRouter(QuestionList)