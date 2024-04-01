import React, { useEffect, useState } from "react";

import SideBar from "../components/SideBar";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

const Trigger = () => {
  const [trigger, setTrigger] = useState([]);
  const token = Cookies.get('token')


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const id = Cookies.get("id");
        const res = await axios.get(
          "https://ktm-backend.onrender.com/api/trigger/getAllTrigger/" + id,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setTrigger(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* <SideBar /> */}

        <Navbar />
      <div className="p-4 h-full w-fit sm:w-full text-xs sm:text-sm md:text-base  ">
        <div className="p-4 border-2 border-slate-950 border-solid rounded-lg   ">
        <div className="flex justify-between items-center">
            <h3 className="px-6 py-2 font-bold">Triggers</h3>
            <NavLink
                to={"/createTag"}
                className="px-2 py-1 sm:px-3 md:px-4 bg-blue-900 rounded-lg text-white "
              >
                {" "}
                New
              </NavLink>
          </div>
          <div className="flex flex-col">
            <table className="w-1/1 text-left text-sm font-light text-surface ">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Trigger
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Event Type
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Filter
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {trigger.map((t,index) => (
                  <tr
                    key={t._id}
                    className={`${index % 2 === 0 ? 'bg-red-100' : ''} border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200`}
                  >
                    <td className=" text-wrap px-3  py-4 font-medium break-all">
                      {t.triggerName}
                    </td>
                    <td className="text-wrap px-3  py-4 font-medium break-all">
                      {t.triggerType}
                    </td>
                    <td className="text-wrap px-3 py-4 font-medium break-all">
                      {t.key} = {t.value}
                    </td>

                    <td className="text-wrap px-3  py-4 font-medium break-all">
                      {new Date(t.createdAt).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trigger;
