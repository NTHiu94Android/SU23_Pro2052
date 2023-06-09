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

//---------------------------------Adderss---------------------------------
//Lay danh sach dia chi theo idUser
export const getAddressByIdUser = async(idUser) => {
    const res = await CustomAxios().get(`/address/api/get-address-by-idUser/${idUser}`);
    return res;
};

//Them dia chi
export const addAddress = async (body, status, idUser) => {
    const data = {
        body, status, idUser
    };
    const response = await CustomAxios().post(`/address/api/add-address`, data);
    return response;
}

//Cap nhat dia chi
export const updateAddress = async(_id, body, status, idUser) => {
    const data = {
        _id, body, status, idUser
    }
    const res = await CustomAxios().post(`/address/api/update-address`, data);
    return res;
};

//Xoa dia chi
export const deleteAddress = async(_id) => {
    const res = await CustomAxios().get(`/address/api/delete-address/${_id}`);
    return res;
};












