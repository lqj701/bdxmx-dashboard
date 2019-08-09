import React from 'react'
import { Table, Input, Popconfirm, Form, Button, message } from 'antd'
import service from '../../services';
import PaperDetail from './PaperDetail'

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)
const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  getInput = () => {
    return <Input />
  }

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props

    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}

class PaperList extends React.Component {
  state = {
    data: [],
    editingId: '',
  }

  constructor(props) {
    super(props)

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '6%',
        editable: false,
      },
      {
        title: '试卷名',
        dataIndex: 'name',
        width: '24%',
        editable: true,
      },
      {
        title: '试题ID',
        dataIndex: 'questionIds',
        width: '50%',
        editable: true,
      },
      {
        title: '总分',
        dataIndex: 'totalScores',
        width: '8%',
        editable: false,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '12%',
        render: (text, record) => {
          const editable = this.isEditing(record)
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <Button
                        size={'small'}
                        onClick={() => this.save(form, record.id)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </Button>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="确定取消?"
                    onConfirm={() => this.cancel(record.id)}
                  >
                    <Button size={'small'}>取消</Button>
                  </Popconfirm>
                </span>
              ) : (
                  <div>
                    <Button style={{ marginRight: '10px', marginBottom: '4px' }} size={'small'} onClick={() => this.edit(record.id)}>编辑</Button>
                    <Button size={'small'} onClick={() => this.deletePaper(record.id)}>删除</Button>
                  </div>
                )}
            </div>
          )
        },
      },
    ]
  }

  componentDidMount() {
    this.getPaperList()
  }

  getPaperList = (params = { page: 1, row: 10 }) => {
    service('getPaperList', params).then(res => {
      if (res.code === 0) {
        this.setState({
          data: res.data
        })
      } else {
        message.error('获取数据失败，请刷新页面或联系管理员')
      }
    })
  }

  updatePaper = newData => {
    let params = {
      examPaperId: newData.id,
      paperType: newData.paperType,
      name: newData.name,
      questionIds: newData.questionIds,
      totalScore: newData.totalScores,
    }
    service('updatePaper', params).then(res => {
      if (res.code === 0) {
        this.getPaperList()
      } else {
        message.error('获取数据失败，请刷新页面或联系管理员')
      }
    })
  }

  deletePaper = id => {
    service('deletePaper', { examPaperIds: [id] }).then(res => {
      if (res.code === 0) {
        this.getPaperList()
      } else {
        message.error('获取数据失败，请刷新页面或联系管理员')
      }
    })
  }

  isEditing = record => record.id === this.state.editingId

  cancel = () => {
    this.setState({ editingId: '' })
  }

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      const index = newData.findIndex(item => id === item.id)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        this.setState({ data: newData, editingId: '' })
      } else {
        newData.push(row)
        this.setState({ data: newData, editingId: '' })
      }
      this.updatePaper(newData.find(o => o.id === id))
    })
  }

  edit(id) {
    this.setState({ editingId: id })
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      }
    })

    const getPaperDetail = record => <PaperDetail record={record} />

    return (
      <Table
        rowKey={record => record.id}
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
        expandedRowRender={getPaperDetail}
      />
    )
  }
}

export default PaperList