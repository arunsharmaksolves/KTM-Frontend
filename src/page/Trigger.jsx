import React, { useEffect, useState } from "react";

import SideBar from "../components/SideBar";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Trigger = () => {
  const [trigger, setTrigger] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/trigger/getAllTrigger"
        );
        console.log(res.data);
        setTrigger(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);

  return (
    <>
      <SideBar />

      <div className="p-4 ml-64 h-screen pt-20 ">
        <div className="p-4 border-2 border-slate-950 border-solid rounded-lg ">
          <div className="flex justify-between">
            <h3 className="px-6 py-2">Triggers</h3>
            <NavLink to={'/createTrigger'} className="px-6 py-2 bg-blue-900 rounded-lg text-white"> New</NavLink >
          </div>
          <div className="flex flex-col">
            <table className="min-w-full text-left text-sm font-light text-surface ">
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
                {trigger.map((t) => (

                  <tr key={t._id} className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200">
                    <td className=" text-wrap px-6 py-4 font-medium">
                      {t.triggerName}
                    </td>
                    <td className="text-wrap px-6 py-4 font-medium">
                      {t.triggerType}
                    </td>
                    <td className="text-wrap px-6 py-4 font-medium">
                        {t.key} = {t.value}
                    </td>
               
                    <td className=" text-wrap px-6 py-4 font-medium">
                    {new Date(t.createdAt).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trigger;
