import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import AuthProvider from './components/Provider/AuthProvider'
import Overview from './components/Dashboard/Overview';
import Transaction from './components/Dashboard/Transaction';
import MyProfile from './components/Dashboard/MyProfile';
import UserDashboard from './components/Dashboard/UserDashboard';
import SendMoney from './components/Dashboard/SendMoney';
import CashOut from './components/Dashboard/CashOut';
import CashIn from './components/Dashboard/CashIn';
import Balance from './components/Dashboard/Balance';
import { HelmetProvider } from 'react-helmet-async';
import Profile from './components/Dashboard/Profile';
import PrivateRoutes from './components/Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path:'/',
        element: <Home></Home>
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path:'/register',
        element: <Register></Register>
      },
      {
        path:'/overview',
        element: <Overview></Overview>
      },
      {
        path:'/transaction',
        element: <PrivateRoutes><Transaction></Transaction></PrivateRoutes>,
        loader: ({params}) => fetch(`https://mfs-server-three.vercel.app/transaction/${params.id}`)
      },
      {
        path: '/user/:id',
        element: <MyProfile></MyProfile>,
        loader: ({params}) => fetch(`https://mfs-server-three.vercel.app/user/${params.id}`)
      },
      {
        path:'/userDashboard',
        element: <UserDashboard></UserDashboard>
      },
      {
        path:'/sendMoney',
        element: <SendMoney></SendMoney>
      },
      {
        path:'/cashIn',
        element: <CashIn></CashIn>
      },
      {
        path:'/cashOut',
        element: <CashOut></CashOut>
      },
      {
        path:'/balance',
        element: <Balance></Balance>
      },
      {
        path:'/profile',
        element: <Profile></Profile>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <HelmetProvider>
   <RouterProvider router={router} />
   </HelmetProvider>
   </AuthProvider>
  </React.StrictMode>,
)
