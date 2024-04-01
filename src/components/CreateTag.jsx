import React from "react";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { toast } from "react-toastify";
import SideBar from "./SideBar";
import Navbar from './Navbar';
import Cookies from "js-cookie";


const CreateTag = () => {
  const token = Cookies.get('token')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const triggerType = watch("triggerType");

  const onSubmit = async (data) => {
    data.userId = Cookies.get("id")
    try {
      const res =await axios.post('http://localhost:3000/api/tagTrigger/createTag',{data},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res)
      toast.success("Tag Created")
      reset()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col w-full">
      {/* <SideBar /> */}

      <Navbar/>
      <main className="flex flex-col items-center p-4 h-full w-full">
        <div className="flex flex-col gap-y-5 p-10 h-min border-solid border-2 border-black-500 rounded-2xl sm:w-[425px]">
          <p className="text-center text-2xl font-bold  ">Tag Configuration</p>

          <form
            className="flex flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="tagName" className="text-sm">
              Tag Name
            </label>
            <input
              className="border-2 rounded-md p-1 text-sm text-blue-900 placeholder:text-xs"
              type="text"
              name="tagName"
              id="tagName"
              placeholder="Enter tag name"
              {...register("tagName", {
                required: "Tag Name is required",
              })}
            />
            {errors.tagName && (
              <p className="text-red-500 text-xs">{errors.tagName.message}</p>
            )}


            <label htmlFor="tagType" className="text-sm">
              Tag Type
            </label>
            <select
              className="border-2 rounded-md  py-2 px-1 text-xs text-blue-900 bg-white placeholder:text-xs"
              id="tagType"
              {...register("tagType", {
                required: "Please select an option",
              })}
            >
              <option value="Page View">Page View</option>
              <option value="Click">Click</option>
              <option value="Timing">Timing</option>
              <option value="Social">Social</option>
            </select>
            {errors.triggerType && (
              <p className="text-red-500 text-xs">
                {errors.triggerType.message}
              </p>
            )}

            <p className="text-center pt-10 pb-5 text-2xl font-bold ">
              Trigger Configuration
            </p>

            <label htmlFor="triggerName" className="text-sm">
              Trigger Name
            </label>
            <input
              className="border-2 rounded-md  p-1 text-sm text-blue-900 placeholder:text-xs"
              type="text"
              name="triggerName"
              id="triggerName"
              placeholder="Enter tag name"
              {...register("triggerName", {
                required: "Name is required",
              })}
            />
            {errors.triggerName && (
              <p className="text-red-500 text-xs">
                {errors.triggerName.message}
              </p>
            )}

            <label htmlFor="triggerType" className="text-sm">
              Trigger Type
            </label>
            <select
              className="border-2 rounded-md  py-2 px-1 text-xs text-blue-900 bg-white placeholder:text-xs"
              id="triggerType"
              {...register("triggerType", {
                required: "Please select an option",
              })}
            >
              <option value="">Select an option</option>
              <option value="Page View">Page View</option>
              <option value="Click">Click</option>
              <option value="Timing">Timing</option>
              <option value="Social">Social</option>
            </select>
            {errors.triggerType && (
              <p className="text-red-500 text-xs">
                {errors.triggerType.message}
              </p>
            )}

            <div className="flex justify-between">
              {triggerType && (
                <>
                  <div className="flex w-1/3 flex-col">
                    <label htmlFor="key" className="text-sm">
                      Fire Condition
                    </label>
                    <select
                      className="border-2 rounded-md  py-2 px-1 text-xs text-blue-900 bg-white placeholder:text-xs"
                      id="key"
                      {...register("key")}
                    >
                      {triggerType === "Page View" ? (
                        <>
                          <option value="PageUrl">Page Url</option>
                          <option value="PagePath">Page Path</option>
                          <option value="PageHostname">Page Hostname</option>
                        </>
                      ) : (
                        <>
                          <option value="ClickId">ClickId</option>
                          <option value="ClickText">ClickText</option>
                          <option value="ClickClassName">ClickClassName</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="flex w-3/5 flex-col">
                    <label htmlFor="value" className="text-sm">
                      Value
                    </label>
                    <input
                      className="border-2 rounded-md  p-1 text-sm text-blue-900 placeholder:text-xs"
                      type="text"
                      name="value"
                      id="value"
                      placeholder="Enter value"
                      {...register("value", {
                        required: "value is required",
                      })}
                    />
                    {errors.value && (
                      <p className="text-red-500 text-xs">
                        {errors.value.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <input
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 my-3 text-sm font-semibold  text-white hover:bg-indigo-800 hover:cursor-pointer
                "
            />
          </form>
        </div>
      </main>
    </div >
  );
};

export default CreateTag;
