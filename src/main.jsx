import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registerpage from './pages/register.jsx'
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import { WapperAuth } from './components/context/auth.context.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index : true,
        element : <HomePage/>
      },
      {
        path: "/user",
        element: <UserPage/>,
      }
    ]
  },
  {
    path: '/register',
    element:<Registerpage/>
  },
  {
    path: '/login',
    element:<LoginPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WapperAuth>
   <RouterProvider router={router} />
   </WapperAuth>
  </React.StrictMode>,
)
