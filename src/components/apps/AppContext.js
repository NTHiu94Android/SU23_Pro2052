import { createContext, useEffect, useState } from "react";
import { getAllCategories, getAllProducts, getAllSubProducts } from "./AppService";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subProducts, setSubProducts] = useState([]);
  const [fullProducts, setFullProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _categories = await getAllCategories();
        setCategories(_categories.data);

        const _products = await getAllProducts();
        setProducts(_products.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _subProducts = await getAllSubProducts();
        setSubProducts(_subProducts.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const mergeData = () => {
      const _fullProduct = products.map((product) => {
        const subProduct = subProducts.find((sub) => sub.idProduct === product._id);
        return {
          ...product,
          subProduct: { ...subProduct }
        };
      });
      setFullProducts(_fullProduct);
    };

    if (products.length > 0 && subProducts.length > 0) {
      mergeData();
    }
  }, [products, subProducts]);

  const onGetProductsByCategory = (idCategory) => {
    const _products = fullProducts.filter((product) => product.idCategory === idCategory);
    return _products;
  };


  return (
    <AppContext.Provider value={{ categories, products, subProducts, fullProducts, onGetProductsByCategory }}>
      {children}
    </AppContext.Provider>
  );
};
