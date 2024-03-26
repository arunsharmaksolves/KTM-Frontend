import React, { useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { PiTagSimpleDuotone } from "react-icons/pi";
import Cookies from "js-cookie";
import { GrAction } from "react-icons/gr";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdOutlineDescription } from "react-icons/md";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const SideBar = () => {
  const navigate = useNavigate();
  const [tagCount, setTagCount] = useState();
  const [triggerCount, setTriggerCount] = useState();

  const logOut = () => {
    Cookies.remove("id");
    Cookies.remove("token");
    navigate("/login");
  };

  async function count() {
    try {
      const id = Cookies.get('id')
      const countTag = await axios.get(
        "http://localhost:3000/api/tagTrigger/countAllTag/"+id
      );
      const countTrigger = await axios.get(
        "http://localhost:3000/api/trigger/countAllTrigger/"+id
      );
      console.log(countTag.data)
      setTagCount(countTag.data);
      setTriggerCount(countTrigger.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    count();
  }, []);

  return (
    <aside
      id="default-sidebar"
      className="w-fit h-screen "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto border-2 border-black-500">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="/home"
              className="aria-[current=page]:text-red-600 flex justify-center items-center p-2 rounded-lg  hover:cursor-pointer hover:bg-slate-200"
            >
              <PiTagSimpleDuotone />

              <span className="flex-1 ms-3 whitespace-nowrap">Tags</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {tagCount}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trigger"
              className=" aria-[current=page]:text-red-600 flex justify-center items-center p-2  rounded-lg  hover:cursor-pointer hover:bg-slate-200"
            >
              <GrAction />
              <span className="flex-1 ms-3 whitespace-nowrap">Triggers</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {triggerCount}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/script"
              className="aria-[current=page]:text-red-600 flex justify-center items-center p-2  rounded-lg  hover:cursor-pointer hover:bg-slate-200"
            >
              <MdOutlineDescription />
              <span className="flex-1 ms-3 whitespace-nowrap">Script</span>
            </NavLink>
          </li>
          {/* <li>
            <a href="#" className="flex items-center p-2 ">
     
               <span className="flex-1 ms-3 whitespace-nowrap">Variables</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </a>
         </li> */}
          <li>
            <NavLink
              to="/analytics"
              className="aria-[current=page]:text-red-600 flex justify-center items-center p-2  rounded-lg  hover:cursor-pointer hover:bg-slate-200"
            >
            <TbDeviceAnalytics />
              <span className="flex-1 ms-3 whitespace-nowrap">Analytics</span>
            </NavLink>
          </li>

          <li>
            <div
              className="flex justify-center items-center p-2  rounded-lg  hover:cursor-pointer hover:bg-slate-200"
              onClick={logOut}
            >
              <VscSignOut />
              <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
