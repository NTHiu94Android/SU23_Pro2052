import CustomAxios from "../../helpers/Axiosinstance";

export const getAllCategories = async () => {
    try {
        const res = await CustomAxios().get('categories/api/get-all-category');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAllProducts = async () => {
    try {
        const res = await CustomAxios().get('products/api/get-products');
        return res;
    } catch (error) {
        console.log(error);
    }
};