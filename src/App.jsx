import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from './util/axios.customize'
import Header from './components/layout/header'
import { Outlet } from 'react-router-dom'
import { AuthContext } from './components/context/auth.context.jsx';

function App() {
  const {setAuth} = useContext(AuthContext)
  const [count, setCount] = useState(0)
  useEffect(()=>{
    const fetchAccount = async ()=>{
      const res =await axios.get(`/v1/api/account`);
       if(res){
        setAuth({
          isAuthencontext : true,
            user :{
                email: res.data.email,
                name :res.data.name
            }
      })
      }
      console.log("check response: " ,res)
    }
    fetchAccount()
  },[])
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
