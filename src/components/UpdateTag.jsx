import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

const updateTag = () => {
  const tagId = useParams().id;
  const token = Cookies.get('token')


  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log("search = ",searchParams.get('name'),searchParams.get('age'))
  const [tag, setTag] = useState([]);
  const [trigger, setTrigger] = useState([]);
  const [trig, setTrig] = useState([]);
  const [updateTrig, setUpdateTrig] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const id = Cookies.get("id");
        const taginfo = await axios.get(
          "http://localhost:3000/api/tagTrigger/getOneTag/" + tagId,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const triggerInfo = await axios.get(
          "http://localhost:3000/api/trigger/getAllTrigger/" + id,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTag(taginfo.data);
        // console.log(taginfo.data);
        // console.log(triggerInfo.data)
        setTrig(taginfo.data.trigger);
        setTrigger(
          triggerInfo.data.filter(
            (t) => !taginfo.data.trigger.some((tr) => tr.triggerId === t._id)
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [updateMode]);

  const handleCheckboxChange = (triggerId, triggerName) => {
    const updatedTriggers = [...updateTrig];
    const index = updatedTriggers.findIndex((t) => t.id === triggerId);

    if (index === -1) {
      updatedTriggers.push({ triggerId, triggerName });
    } else {
      updatedTriggers.splice(index, 1);
    }

    setUpdateTrig(updatedTriggers);
  };

  const handleUpdate = async () => {
    if (updateTrig.length === 0) {
      toast.warning("First select a value");
      return;
    }
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/tagTrigger/addTrigger/" + tagId,
        {
          updateTrig,
        }
      );
      console.log(res.data);
      console.log(updateTrig);
      toast.success("Trigger Added");
      setUpdateTrig([]);
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex ">
      <SideBar />

      <div className="p-4 h-full w-full flex items-center flex-col">
        <Navbar />
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Tag Information
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100 w-full ">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Tag Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {tag.tagName}
              </dd>
            </div>
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Tag Type
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {tag.tagType}
              </dd>
            </div>
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Created At
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(tag.createdAt).toDateString()}
              </dd>
            </div>
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Triggers
              </dt>
              <dd className=" flex flex-wrap gap-4 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {trig.map((t) => (
                  <span
                    key={t._id}
                    className="  h-fit bg-red-300 px-2 rounded-lg font-bold"
                  >
                    {" "}
                    {t.triggerName}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {trigger.length > 0 && (
          <>
            {updateMode ? (
              <div className="flex gap-2">
                <button
                  className="mt-10 bg-blue-400 text-xl p-2 rounded-lg"
                  onClick={() => setUpdateMode(false)}
                >
                  Cancle
                </button>
                <button
                  onClick={handleUpdate}
                  className="mt-10 bg-green-400 text-xl p-2 rounded-lg"
                >
                  Update
                </button>
              </div>
            ) : (
              <button
                className="mt-10 bg-blue-400 text-xl p-2 rounded-lg"
                onClick={() => setUpdateMode(true)}
              >
                Click To Add Triggers
              </button>
            )}

            <div className=" h-fit pt-10 w-full">
              <div className="p-4 border-2 border-slate-950 border-solid rounded-lg ">
                <div className="flex justify-between">
                  <h3 className="px-6 py-2">Triggers</h3>
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
                        {updateMode && (
                          <th scope="col" className="px-6 py-4">
                            Select
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {trigger.map((t) => (
                        <tr
                          key={t._id}
                          className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200"
                        >
                          <td className="text-wrap px-6 py-4 font-medium break-all">
                            {t.triggerName}
                          </td>
                          <td className="text-wrap px-6 py-4 font-medium break-all">
                            {t.triggerType}
                          </td>
                          <td className="text-wrap px-6 py-4 font-medium break-all">
                            {t.key} = {t.value}
                          </td>
                          {updateMode && (
                            <td className="text-wrap px-6 py-4 font-medium break-all">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange(t._id, t.triggerName)
                                }
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default updateTag;
