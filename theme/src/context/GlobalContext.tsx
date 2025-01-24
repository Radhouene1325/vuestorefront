import React, {createContext, useState, useContext, ReactNode} from "react"
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useRouter} from "next/router";
interface DataContextProps {
    items: any[];
    products: any;
    router: ReturnType<typeof useRouter>;
}


const ThemeContext=createContext<DataContextProps | undefined>(undefined);

export const ThemeProvider = ({ children, items, products }: {
    children: ReactNode,
    items: any,
    products: any
}) => {


    const router = useRouter();


    console.log(router)

    // console.log(items)
    // const [theme, setTheme] = useState("hwllo world");
    //
    // const toggleTheme = () => {
    //    setTheme("hello world")
    // };

    let isAuthntication = useSelector((state: RootState) => state.user.auth);
    console.log(isAuthntication)

    return (
        <ThemeContext.Provider value={{
            // items
            items,
            products,
            router
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