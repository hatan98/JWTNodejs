import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { loginUserAPI } from '../util/app';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
const LoginPage = ()=>{
        const navigate = useNavigate()
        const {Auth,setAuth} = useContext(AuthContext)
        const onFinish = async (values) =>  {
            const {email,password} = values
            const res = await loginUserAPI(email,password);
            if(res && res.data.EC === 0 ){
                localStorage.setItem("access_token",res.data.access_token)
                notification.success(
                    {message:'Login User',
                      description:'Success'  
                    }
                )
                setAuth({
                  isAuthencontext : true,
                      user :{
                          email: res?.data?.payload?.email ?? "",
                          name :res?.data?.payload?.name ?? ""
                  }
                })
                console.log("login Auth check", Auth)
                navigate("/")
            }else{
                console.log(res.data.EC)
                notification.error(
                    {
                        message:'Create User',
                        description: res?.data?.EM ?? 'Error'
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
        <Form.Item label={null} >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
            </Form>
            </div>
        )
    }

export default LoginPage