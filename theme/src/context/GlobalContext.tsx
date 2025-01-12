import React, {createContext, useState, useContext, ReactNode} from "react"
import {useSelector} from "react-redux";
import {RootState} from "@/store";

interface DataContextProps {
    items: any[];
}


const ThemeContext=createContext<DataContextProps | undefined>(undefined);

export const ThemeProvider = ({ children,products }: {
    children: ReactNode,
    items:any ,
    products:any
}) => {
    // console.log(items)
    // const [theme, setTheme] = useState("hwllo world");
    //
    // const toggleTheme = () => {
    //    setTheme("hello world")
    // };

    return (
        <ThemeContext.Provider value={{
            // items
            products
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};