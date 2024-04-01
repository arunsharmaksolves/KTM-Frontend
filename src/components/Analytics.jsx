import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { ScrollRestoration } from "react-router-dom";

const Analytics = () => {
  const [trigger, setTrigger] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("https://ktm-server-7zfr.onrender.com/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setTrigger(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);

  // Function to generate CSV
  const generateCsv = () => {
    // Prepare CSV content
    let csvContent = "Tag name,Text,Event,Location,Timestamp\n"; // Header row

    // Add data rows
    trigger.forEach((t) => {
      const row = `${t.target.tagName},${t.target.innerText},${t.event},${
        t.location.city
      },${t.location.country},${(t.timeSpent * 10).toFixed(2)}\n`;
      csvContent += row;
    });

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link attributes
    link.href = url;
    link.setAttribute("download", "analytics.csv");

    // Append link to the body
    document.body.appendChild(link);

    // Click the link to trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex  flex-col w-full">
      {/* <SideBar /> */}
        <Navbar />
      <div className="p-4 w-fit sm:w-full  h-screen">
        <div className="p-4 border-2 border-slate-950 border-solid rounded-lg   ">
          <div className="flex justify-between">
            <h3 className="px-6 py-2">Analytics-Dashboard</h3>
            {/* Button to generate CSV */}
            <button
              className="px-2 py-1 sm:px-3 md:px-4 bg-blue-900 rounded-lg text-white "
              onClick={generateCsv}
            >
              Generate CSV
            </button>
          </div>
          <div className="flex flex-col">
            {/* Render table */}
        
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
                {trigger.map((t, index) => (
                  <tr
                    key={t._id}
                    className={`${
                      index % 2 === 0 ? "bg-red-100" : ""
                    } border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200`}
                  >
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
                      {t.location.city}
                      {","}
                      {t.location.country}
                    </td>
                    <td className="text-wrap px-3  py-4 font-medium break-all">
                      {(t.timeSpent * 10).toFixed(2)}
                      {" s"}
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

export default Analytics;
