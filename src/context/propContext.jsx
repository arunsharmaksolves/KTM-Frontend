import { createContext, useState } from "react";

export const Props = createContext()

export const PropsContextProvider = ({children}) =>{
    const [data,setData] = useState("hello")

    return (
        <Props.Provider value={{data,setData}}>
            {children}
        </Props.Provider>
    )
}