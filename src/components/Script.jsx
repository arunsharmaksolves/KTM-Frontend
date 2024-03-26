import React from "react";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import Navbar from './Navbar';


const Script = () => {
    const copy = () =>{
        navigator.clipboard.writeText("https://cdn.jsdelivr.net/gh/arunsharmaksolves/cdn@1.1.2/index.min.js");
        toast.success("Copied Successfully")
    }
  return (
    <div className="flex">
      <SideBar />


      <div className="p-4 flex w-full h-full flex-col items-center justify-center">
      <Navbar/>
        <div className=" border-solid border-2 p-10 rounded-lg relative bg-slate-900 text-white">
            <span className=" text-xl break-all ">
            https://cdn.jsdelivr.net/gh/arunsharmaksolves/cdn@1.1.2/index.min.js
            </span>
            <button className="absolute bottom-0 right-0 text-xl py-1 text-white font-bold px-3 rounded-lg bg-teal-600" onClick={copy}>Copy</button>
            </div>
      </div>
    </div>
  );
};

export default Script;
