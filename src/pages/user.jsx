import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import {getUserAPI} from "../util/app"
const UserPage = ()=>{
        const [dataSource,SetdataSource]=useState([])
        useEffect(()=>{
            const fetchUser = async ()=>{
                const res = await getUserAPI();
                console.log(">>>check res:",res)
                if(!res?.message){
                    SetdataSource(res.data)
                }else {
                  notification.error({
                    message: "Unauthorized",
                    description: res.message
                  })
                }
            }
            fetchUser() 
        },[])  
          
          const columns = [
            {
                title: 'ID',
                dataIndex: '_id',
            },
            {
              title: 'Email',
              dataIndex: 'email',
            },
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Role',
              dataIndex: 'role',
            },
          ]
    return (
        <div style={{padding:30}}>
            <Table bordered
            dataSource={dataSource} columns={columns} />
        </div>
    )      
}
export default UserPage