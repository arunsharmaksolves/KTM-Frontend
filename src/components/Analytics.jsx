import React, { useEffect,useState } from 'react'
import SideBar from './SideBar'
import axios from 'axios';
import Navbar from './Navbar';


const Analytics = () => {
    const [trigger, setTrigger] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/events"
        );
        console.log(res.data);
        setTrigger(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
    // setInterval(()=>{
    // },[1000])
  }, []);

  return (
    
    <>
    <SideBar/>
    <Navbar/>
    <div className="p-4 ml-64 h-screen">
        <div className="p-4 border-2 border-slate-950 border-solid rounded-lg   ">
          <div className="flex justify-between">
            <h3 className="px-6 py-2">Analytics-Dashboard</h3>
          </div>
          <div className="flex flex-col">
            <table className="w-1/1 text-left text-sm font-light text-surface ">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4 break-all">
                    Tag name
                  </th>
                  <th scope="col" className="px-6 py-4 break-all">
                    Text
                  </th>
                  <th scope="col" className="px-6 py-4 break-all">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-4 break-all">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-4 break-all">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {trigger.map((t) => (

                  <tr key={t._id} className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200">
                    <td className=" text-wrap px-3  py-4 font-medium break-all">
                      {t.target.tagName}
                    </td>
                    <td className="text-wrap px-3  py-4 font-medium break-all">
                      {t.target.innerText}
                    </td>
                    <td className="text-wrap px-3 py-4 font-medium break-all">
                        {t.event}
                    </td>
                    <td className="text-wrap px-3 py-4 font-medium break-all">
                        {t.location.city}{","}{t.location.country}
                    </td>
               
                    <td className="text-wrap px-3  py-4 font-medium break-all">
                    {/* {new Date(t.createdAt).toDateString()} */}
                    {(t.timeSpent*10).toFixed(2)}{" s"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Analytics
