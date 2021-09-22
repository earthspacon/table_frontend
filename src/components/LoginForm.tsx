import { Form, Input, Button, Checkbox } from 'antd'
import { FC } from 'react'
import { useHistory } from 'react-router'
import * as api from 'api/api'
import User from 'models/UserModel'

const Login: FC = () => {
  const history = useHistory()

  const onFinish = async (values: User) => {
    const res = await api.login(values)
    localStorage.setItem('token', res.data.token)
    history.push('/')
  }

  return (
    <div className='login-wrapper'>
      <Form
        className='login-form'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
