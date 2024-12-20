import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const {Auth,setAuth} = useContext(AuthContext)
    console.log("check auth nè :",Auth )
    const navigate = useNavigate();
    const items = [
        {
        label: <Link to={`/`}>Home Page</Link>,
        key: 'home',
        icon: <MailOutlined />,
        },
        ... (Auth.isAuthencontext  ? [{
            label: <Link to={`user`}>Users</Link>,
            key: 'user',
            icon: <MailOutlined />,
                
            }] : []),

        {
        label: `Welcome ${Auth?.user?.name}`,
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            ... (Auth.isAuthencontext  ? [{
                label: <span onClick={()=>{
                    localStorage.removeItem("access_token");
                    setAuth({isAuthencontext : false,
                        user :{
                            email: "",
                            name :""
                        }})
                    navigate("/")}
                }>Đăng xuất</span>,
                key: 'logout',
                }] : [{
                    label: <Link to={`login`}>Đăng nhập</Link>,
                    key: 'login',
                    }]),
        ],
        },
        ];
const [current, setCurrent] = useState('mail');
const onClick = (e) => {
console.log('click ', e);
setCurrent(e.key);
};
return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;