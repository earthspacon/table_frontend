import { Form, Input, InputNumber, Button, FormInstance } from 'antd'
import * as api from 'api/api'
import { observer } from 'mobx-react-lite'
import TableModel from 'models/TableModel'

interface Props {
  finish: () => void
  form: FormInstance<TableModel>
  row: TableModel | null
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}
/* eslint-enable no-template-curly-in-string */
const InputForm = ({ finish, form, row }: Props) => {
  const onFinish = async (values: TableModel) => {
    if (!row) {
      await api.addData(values)
      finish()
    } else {
      await api.editData(row._id, values)
      finish()
    }
  }

  return (
    <Form
      form={form}
      {...layout}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name='fullname' label='Name' rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name='age'
        label='Age'
        rules={[{ type: 'number', min: 0, max: 99 }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name='position' label='Position'>
        <Input />
      </Form.Item>

      <Form.Item name='money' label='Activity'>
        <Input />
      </Form.Item>

      <Form.Item name='xren' label='Degree'>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default observer(InputForm)
