import { useEffect, useState } from 'react'
import { Popconfirm, Table, Button, Modal, Form } from 'antd'
import store from 'store/store'
import { observer } from 'mobx-react-lite'
import * as api from 'api/api'
import InputForm from './InputForm'
import TableModel from 'models/TableModel'

const TableForm = () => {
  useEffect(() => {
    store.getData()
  }, [])

  const [visible, setVisible] = useState(false)
  const [row, setRow] = useState<TableModel | null>(null)
  const [form] = Form.useForm()

  const toggleModal = () => {
    setVisible(!visible)
  }

  async function handleDelete(id: string) {
    await api.deleteData(id)
    store.getData()
  }

  function handleEdit(record: TableModel) {
    form.setFieldsValue(record)
    setRow(record)
    toggleModal()
  }

  async function deleteAll() {
    await api.deleteAll()
    store.getData()
  }

  function onCancel() {
    store.getData()
    toggleModal()
    form.resetFields()
    setRow(null)
  }

  const columns = [
    { title: 'Full Name', dataIndex: 'fullname', width: 250 },
    { title: 'Age', dataIndex: 'age', width: 50 },
    { title: 'Positon', dataIndex: 'position', width: 250 },
    { title: 'Activity', dataIndex: 'money', width: 250 },
    { title: 'Degree', dataIndex: 'degree', width: 250 },
    {
      render: (record: TableModel) => {
        return store.data.length >= 1 ? (
          <>
            <Button
              onClick={() => {
                handleEdit(record)
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => {
                handleDelete(record._id)
              }}
            >
              <Button>Delete</Button>
            </Popconfirm>
          </>
        ) : null
      },
    },
  ]

  return store.loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div className='plus'>
        <Button type='primary' onClick={toggleModal}>
          +
        </Button>
      </div>
      <Table columns={columns} dataSource={store.data} />
      <Popconfirm title='Sure to delete?' onConfirm={deleteAll}>
        <Button>Delete All</Button>
      </Popconfirm>
      <Modal
        title='Chinovovirus Data'
        visible={visible}
        onCancel={onCancel}
        footer={false}
      >
        <InputForm finish={onCancel} form={form} row={row} />
      </Modal>
    </>
  )
}
export default observer(TableForm)
