import React from "react";
import {Button, Form, Icon, Input, message, Radio, Upload} from "antd";
import localStore from "../../utils/localStore";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20}
    }
};

const uploadProps = (audioList = []) => {
    if (typeof audioList === "string") {
        audioList = JSON.parse(audioList).address;
    }

    const defaultFileList = audioList.reduce((prev, cur) => {
        prev.push({
            uid: Math.random(), // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
            name: cur.replace(/files.bdxmx.com\/tmp\//, ""), // 文件名
            status: "done", // 状态有：uploading done error removed
            response: '{"status": "success"}', // 服务端响应内容
            linkProps: '{"download": "image"}' // 下载链接额外的 HTML 属性
        });
        return prev;
    }, []);

    return {
        name: "file",
        action: "https://api.bdxmx.com/api/file/multiFileUpload",
        defaultFileList,
        headers: {
            uid: localStore.get("user").uid
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };
};

export const ChoiceQuestion = ({getFieldDecorator, initValue = {}}) => {
    return (
        <React.Fragment>
            <FormItem {...formItemLayout} label="题干">
                {getFieldDecorator("questionStem", {
                    initialValue: initValue.questionStem
                })(<Input.TextArea placeholder="请输入题干"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="选项A">
                {getFieldDecorator("optionA", {
                    initialValue: initValue.A
                })(<Input placeholder="选项A"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="选项B">
                {getFieldDecorator("optionB", {
                    initialValue: initValue.B
                })(<Input placeholder="选项B"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="选项C">
                {getFieldDecorator("optionC", {
                    initialValue: initValue.C
                })(<Input placeholder="选项C"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="选项D">
                {getFieldDecorator("optionD", {
                    initialValue: initValue.D
                })(<Input placeholder="选项D"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="音频">
                {getFieldDecorator("audio")(
                    <Upload {...uploadProps(initValue.questionAudio)}>
                        <Button>
                            <Icon type="upload"/> 点击上传
                        </Button>
                    </Upload>
                )}
            </FormItem>
            <Form.Item {...formItemLayout} label="答案">
                {getFieldDecorator("questionAnswer", {
                    // initialValue: initValue.questionAnswer || "A"
                    initialValue: initValue.questionAnswer
                })(
                    <Radio.Group>
                        <Radio value="A">A</Radio>
                        <Radio value="B">B</Radio>
                        <Radio value="C">C</Radio>
                        <Radio value="D">D</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <FormItem {...formItemLayout} label="解答">
                {getFieldDecorator("questionExplain", {
                    initialValue: initValue.questionStem
                })(<Input.TextArea placeholder="请输入解答"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="分值">
                {getFieldDecorator("point", {
                    initialValue: initValue.point
                })(<Input placeholder="试题分值" type="number"/>)}
            </FormItem>
        </React.Fragment>
    );
};
export const JudgementQuestion = ({getFieldDecorator, initValue = {}}) => (
    <React.Fragment>
        <FormItem {...formItemLayout} label="题干">
            {getFieldDecorator("questionStem", {
                initialValue: initValue.questionStem || ""
            })(<Input.TextArea placeholder="请输入题干"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="音频">
            {getFieldDecorator("audio")(
                <Upload {...uploadProps(initValue.questionAudio)}>
                    <Button>
                        <Icon type="upload"/> 点击上传
                    </Button>
                </Upload>
            )}
        </FormItem>
        <Form.Item {...formItemLayout} label="答案">
            {getFieldDecorator("questionAnswer", {
                initialValue: initValue.questionAnswer
            })(
                <Radio.Group>
                    <Radio value="正确">正确</Radio>
                    <Radio value="错误">错误</Radio>
                </Radio.Group>
            )}
        </Form.Item>
        <FormItem {...formItemLayout} label="解答">
            {getFieldDecorator("questionExplain", {
                initialValue: initValue.questionStem
            })(<Input.TextArea placeholder="请输入解答"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="分值">
            {getFieldDecorator("point", {
                initialValue: initValue.point
            })(<Input placeholder="试题分值" type="number"/>)}
        </FormItem>
    </React.Fragment>
);

export const CompletionQuestion = ({getFieldDecorator, initValue = {}}) => (
    <React.Fragment>
        <FormItem {...formItemLayout} label="题干">
            {getFieldDecorator("questionStem", {
                initialValue: initValue.questionStem
            })(<Input.TextArea placeholder="请输入题干"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="音频">
            {getFieldDecorator("audio")(
                <Upload {...uploadProps(initValue.questionAudio)}>
                    <Button>
                        <Icon type="upload"/> 点击上传
                    </Button>
                </Upload>
            )}
        </FormItem>
        <Form.Item {...formItemLayout} label="答案">
            {getFieldDecorator("questionAnswer", {
                initialValue: initValue.questionAnswer
            })(<Input placeholder="答案"/>)}
        </Form.Item>
        <FormItem {...formItemLayout} label="解答">
            {getFieldDecorator("questionExplain", {
                initialValue: initValue.questionStem
            })(<Input.TextArea placeholder="请输入解答"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="分值">
            {getFieldDecorator("point", {
                initialValue: initValue.point
            })(<Input placeholder="试题分值" type="number"/>)}
        </FormItem>
    </React.Fragment>
);

export const AnswerQuestion = ({getFieldDecorator, initValue = {}}) => (
    <React.Fragment>
        <FormItem {...formItemLayout} label="题干">
            {getFieldDecorator("questionStem", {
                initialValue: initValue.questionStem
            })(<Input.TextArea placeholder="请输入题干"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="音频">
            {getFieldDecorator("audio")(
                <Upload {...uploadProps(initValue.questionAudio)}>
                    <Button>
                        <Icon type="upload"/> 点击上传
                    </Button>
                </Upload>
            )}
        </FormItem>
        <Form.Item {...formItemLayout} label="答案">
            {getFieldDecorator("questionAnswer", {
                initialValue: initValue.questionAnswer
            })(<Input.TextArea placeholder="答案"/>)}
        </Form.Item>
        <FormItem {...formItemLayout} label="解答">
            {getFieldDecorator("questionExplain", {
                initialValue: initValue.questionStem
            })(<Input.TextArea placeholder="请输入解答"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="分值">
            {getFieldDecorator("point", {
                initialValue: initValue.point
            })(<Input placeholder="试题分值" type="number"/>)}
        </FormItem>
    </React.Fragment>
);
