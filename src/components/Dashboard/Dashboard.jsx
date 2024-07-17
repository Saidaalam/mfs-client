// src/components/Dashboard.jsx
import { useContext } from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiFillDollarCircle } from "react-icons/ai";
import {  MdLocalPostOffice, MdPostAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../Provider/AuthProvider';
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  
  return (
    <div className="flex">  
      <Helmet>
            <title>MFS | Dashboard</title>
           </Helmet>
      <div className="w-72 min-h-screen bg-sky-800 text-white">
        <ul className="menu p-4 text-lg">
          {user?.role === 'admin' ? (
            <>
              <li>
                <NavLink to="/adminProfile">
                  <FaHome />
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/manageUsers">
                  <MdPostAdd />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/reportedComments">
                  <FaUsers />
                  Reported Comments
                </NavLink>
              </li>
              <li>
                <NavLink to="/announcement">
                  <IoIosPeople />
                  Make Announcement
                </NavLink>
              </li>
            </>
          ) : user?.role === 'agent' ? (
            <>
              <li>
                <NavLink to="/profile">
                  <CgProfile />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/transactions">
                  <MdLocalPostOffice />
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink to="/balance">
                  <AiFillDollarCircle />
                  Balance
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/userDashboard">
                  <CgProfile />
                  User Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/sendMoney">
                  <MdPostAdd />
                  Send Money
                </NavLink>
              </li>
              <li>
                <NavLink to="/cashIn">
                  <CgProfile />
                  Cash In
                </NavLink>
              </li>
              <li>
                <NavLink to="/cashOut">
                  <MdLocalPostOffice />
                  Cash Out
                </NavLink>
              </li>
              <li>
                <NavLink to="/balance">
                  <AiFillDollarCircle />
                  Balance
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
             <NavLink to="/overview">
              <FaHome />
              Overview
              </NavLink>
          </li>
          <li>
          <NavLink to="/transaction">
              <FaUsers />
              Transactions
              </NavLink>
          </li>
        </ul>
      </div>
      
      <h2 className="text-4xl font-bold ml-20 mt-10">Welcome to user dashboard</h2>
    </div>
  );
};

export default Dashboard;
