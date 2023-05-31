import { createContext, useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "./AppService";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

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
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                setProducts(res.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
        fetchProducts();
    }, []);
    return (
        <AppContext.Provider value={{ categories, products }}>
            {children}
        </AppContext.Provider>
    );
}
