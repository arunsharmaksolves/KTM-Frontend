import React, { useEffect, useState } from "react";

import SideBar from "../components/SideBar";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

const Home = () => {
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    const id = Cookies.get('id')
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/tagTrigger/getAllTag/"+id
        );
        console.log(res.data);
        setTags(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
    console.log(id)
  }, []);

  return (
    <>
      <SideBar />
      <Navbar/>


      <div className="p-4 ml-64 h-full pt-20 ">
        <div className="p-4 border-2 border-slate-950 border-solid rounded-lg ">
          <div className="flex justify-between items-center">
            <h3 className="px-6 py-2 font-bold">Tags</h3>
            <div className="flex gap-2">
              <NavLink
                to={"/createTag"}
                className="px-6 py-2 bg-blue-900 rounded-lg text-white"
              >
                {" "}
                New
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col">
            <table className="min-w-full text-left text-sm font-light text-surface ">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Tag
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Trigger
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200"
                  >
                    <td className=" text-wrap px-6 py-4 font-medium hover:underline cursor-pointer">
                      <Link to={"/updateTag/" + t._id}> {t.tagName}</Link>
                    </td>
                    <td className="text-wrap px-6 py-4 font-medium break-all">
                      {t.tagType}
                    </td>
                    <td className="text-wrap px-6 py-4 font-medium break-all flex flex-col gap-2">
                      {t.trigger.map((i) => (
                        <p
                          className="bg-red-300 rounded-lg px-2 text-center"
                          key={i._id}
                        >
                          {" "}
                          {i.triggerName}
                        </p>
                      ))}
                    </td>
                    <td className=" text-wrap px-6 py-4 font-medium break-all">
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

export default Home;
