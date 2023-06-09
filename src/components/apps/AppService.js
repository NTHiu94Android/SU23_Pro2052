import CustomAxios from "../../helpers/Axiosinstance";


export const getCategories = async () => {
    const response = await CustomAxios().get('categories/api/get-all-category');
    return response;
}; 


//Lay danh sanh thuong hieu theo idCategory
export const getBrandsByIdCategory = async (idCategory) => {
    const response = await CustomAxios().get(`brands/api/get-brand-by-id-category/${idCategory}`);
    return response;
};


//Lay tat ca san pham
export const getProducts = async () => {
    const response = await CustomAxios().get('products/api/get-products');
    return response;
};

//Lay tat ca sub san pham theo idProduct
export const getSubProductsByIdProduct = async (idProduct) => {
    const response = await CustomAxios().get(`sub-products/api/get-sub-products-by-id-product/${idProduct}`);
    return response;
};
//Lay tat ca subProducts
export const getSubProducts = async () => {
    const response = await CustomAxios().get('sub-products/api/get-all-sub-products');
    return response;
};
//Lay tat ca picture theo idProduct
export const getPicturesByIdProduct = async (idSubProduct) => {
    const response = await CustomAxios().get(`pictures/api/get-pictures-by-idSubProduct/${idSubProduct}`);
    return response;
};
//Lay danh tat ca review
export const getReviews = async () => {
    const response = await CustomAxios().get('reviews/api/get-all-review');
    return response;
};

export const getReviewsById = async (idProduct) => {
    const response = await CustomAxios().get(`reviews/api/get-review-by-idProduct/${idProduct}`);
    return response;
}











