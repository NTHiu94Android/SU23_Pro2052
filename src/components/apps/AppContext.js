import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "./AppService";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);
    return (
        <AppContext.Provider value={{ categories }}>
            {children}
        </AppContext.Provider>
    );
}
