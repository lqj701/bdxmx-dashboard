import React from "react";
import { Row, Form, Button, message, Tabs } from "antd";
import {
  ChoiceQuestion,
  CompletionQuestion,
  AnswerQuestion,
  JudgementQuestion
} from "./QuestionType";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import service from "../../services/index";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class QuestionAdd extends React.Component {
  state = {
    questionType: 1
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      let questionAudio;

      if (values.audio) {
        questionAudio = values.audio.fileList.reduce((prev, cur) => {
          prev.push(cur.response.data[0].url);
          return prev;
        }, []);
      }

      const params = {
        accountId: this.props.user.id,
        courseType: this.props.user.type,
        questionType: this.state.questionType, //1：选择；2：判断；3：填空；4：解答
        stem: values.questionStem,
        questionChoice: {
          A: values.optionA,
          B: values.optionB,
          C: values.optionC,
          D: values.optionD
        },
        questionAudio: JSON.stringify({ address: questionAudio }),
        answer: values.questionAnswer,
        point: values.point,
        questionExplain: values.questionExplain
      };
      this.addQuestion(params);
    });
  };

  addQuestion = params => {
    service("addQuestion", params).then(res => {
      if (res.code === 0) {
        message.success("添加试题成功，即将前往试题列表页", 1).then(() => {
          this.props.history.push("/question/list");
        });
      } else {
        message.error("添加试题失败，请重试或联系管理员");
      }
    });
  };

  handleChangeTab = e => {
    const questionType = e;
    this.setState({ questionType });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="start" align="middle">
        <Tabs
          defaultActiveKey="1"
          onChange={this.handleChangeTab}
          style={{ minWidth: "800px" }}
        >
          <TabPane tab="选择题" key="1">
            <Form
              onSubmit={this.handleSubmit}
              style={{ width: "80%", maxWidth: "800px" }}
            >
              <ChoiceQuestion getFieldDecorator={getFieldDecorator} />
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  提交
                </Button>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="判断题" key="2">
            <Form
              onSubmit={this.handleSubmit}
              style={{ width: "80%", maxWidth: "800px" }}
            >
              <JudgementQuestion getFieldDecorator={getFieldDecorator} />
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  提交
                </Button>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="填空题" key="3">
            <Form
              onSubmit={this.handleSubmit}
              style={{ width: "80%", maxWidth: "800px" }}
            >
              <CompletionQuestion getFieldDecorator={getFieldDecorator} />
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  提交
                </Button>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="解答题" key="4">
            <Form
              onSubmit={this.handleSubmit}
              style={{ width: "80%", maxWidth: "800px" }}
            >
              <AnswerQuestion getFieldDecorator={getFieldDecorator} />
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  提交
                </Button>
              </FormItem>
            </Form>
          </TabPane>
        </Tabs>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const WrappedComponent = connect(mapStateToProps)(QuestionAdd);

export default withRouter(Form.create()(WrappedComponent));
