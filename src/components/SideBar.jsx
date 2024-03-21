import React, { useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { PiTagSimpleDuotone } from "react-icons/pi";
import Cookies from "js-cookie";
import { GrAction } from "react-icons/gr";
import {useNavigate,NavLink} from 'react-router-dom'
import axios from "axios";


const SideBar = () => {
    const navigate = useNavigate()
    const [tagCount,setTagCount] = useState()
    const [triggerCount,setTriggerCount] = useState()

  const logOut = () => {
    Cookies.remove("id");
    navigate('/login')
  };

  async function count(){
    try {
      const countTag = await axios.get('http://localhost:3000/api/tagTrigger/countAllTag')
      const countTrigger = await axios.get('http://localhost:3000/api/trigger/countAllTrigger')
      setTagCount(countTag.data) 
      setTriggerCount(countTrigger.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    count()
  },[])
  
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto border-2 border-black-500">
        <ul className="space-y-2 font-medium">
          <li>
          <NavLink to="/home" className="flex justify-center items-center p-2 rounded-lg  hover:cursor-pointer hover:bg-slate-200">
          <PiTagSimpleDuotone />

              <span className="flex-1 ms-3 whitespace-nowrap">Tags</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {tagCount}
              </span>
            </NavLink>
          </li>
          <li>
          <NavLink to ="/trigger" className="flex justify-center items-center p-2  rounded-lg  hover:cursor-pointer hover:bg-slate-200">
          <GrAction />
              <span className="flex-1 ms-3 whitespace-nowrap">Triggers</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {triggerCount}
              </span>
            </NavLink>
          </li>
          {/* <li>
            <a href="#" className="flex items-center p-2 ">
     
               <span className="flex-1 ms-3 whitespace-nowrap">Variables</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </a>
         </li> */}
          {/* <li>
            <a href="#" className="flex items-center p-2 ">
               <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
            </a>
         </li> */}

          <li>
            <div className="flex justify-center items-center p-2  rounded-lg  hover:cursor-pointer hover:bg-slate-200" onClick={logOut}>
              <VscSignOut />
              <span className="flex-1 ms-3 whitespace-nowrap" >
                Sign Up
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
