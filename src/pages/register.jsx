import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { createUserAPI } from '../util/app';
import { useNavigate } from 'react-router-dom';
const Registerpage = ()=>{
    const navigate = useNavigate()
    const onFinish = async (values) =>  {
        const {name,email,password} = values
        const res = await createUserAPI (name,email,password);

        if(res){
            notification.success(
                {message:'Create User',
                  description:'Success'  
                }
            )
            navigate("/login")
        }else{
            notification.error(
                {
                    message:'Create User',
                    description:'Error'
                }
            )
        }
        console.log('Success:', res);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div style={{margin: 50}}>
        <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    layout='vertical'
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item label={null} >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
        </Form>
        </div>
    )
}
export default Registerpage