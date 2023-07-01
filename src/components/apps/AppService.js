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
//Them san pham vao gio hang
export const addToCart = async (quantity, price, idOrder, idSubProduct) => {
    return await CustomAxios().post("order-details/api/add-order-detail", {quantity, price, idOrder, idSubProduct });
};
//Lay order_details theo idOrder
export const get_order_details_by_idOrder = async (id) => {
    return await CustomAxios().get("order-details/api/get-order-detail-by-idOrder/" + id);
};

//Cập nhật sản phẩm trong giỏ hàng
export const update_order_details = async (_id, quantity, price, isCmt, idOrder, idSubProduct) => {
    return await CustomAxios().post("order-details/api/update-order-detail", {_id, quantity, price, isCmt, idOrder, idSubProduct});
};

//Xóa sản phẩm trong giỏ hàng
export const delete_order_details = async (_id) => {
    return await CustomAxios().get("order-details/api/delete-order-detail/" + _id);
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
//------------------------------------Order------------------------------------
//Lay danh sach don hang theo idUser
export const getOrdersByIdUser = async(idUser) => {
    const res = await CustomAxios().get(`/orders/api/get-orders-by-idUser/${idUser}`);
    return res;
}

//------------------------------------Review------------------------------------
export const getReviewsById = async (idProduct) => {
    const response = await CustomAxios().get(`reviews/api/get-review-by-idProduct/${idProduct}`);
    return response;
}
//Them don hang
export const addOrder = async (dateCreate, datePayment, totalPrice, status, paymentMethod, address, idUser) => {
    const data = {
        dateCreate, datePayment, totalPrice, status, paymentMethod, address, idUser
    };
    const response = await CustomAxios().post(`/orders/api/add-order`, data);
    return response;
}

//Lay danh sach don hang theo idUser
export const getOrdersByIdUser = async(idUser) => {
    const res = await CustomAxios().get(`/orders/api/get-orders-by-idUser/${idUser}`);
    return res;
}

//Cap nhat don hang
export const updateOrder = async(_id, datePayment, status) => {
    const data = {
        _id, datePayment, status
    }
    const res = await CustomAxios().post(`/orders/api/update-order`, data);
    return res;
};
//Them san pham yeu thich / gio hang
export const addOrderDetail = async (quantity, price, idOrder, idSubProduct) => {
    const response = await CustomAxios().post(`/order-details/api/add-order-detail`, { quantity, price, idOrder, idSubProduct });
    return response;
};

//Lay danh sach san pham yeu thich/gio hang theo idOrder
export const getOrderDetailsByIdOrder = async(idOrder) => {
    const res = await CustomAxios().get(`/order-details/api/get-order-detail-by-idOrder/${idOrder}`);
    return res;
}

//Lay tat ca san pham yeu thich/gio hang
export const getOrderDetails = async() => {
    const res = await CustomAxios().get(`/order-details/api/get-all-order-detail`);
    return res;
};

//Xoa san pham yeu thich/gio hang
export const deleteOrderDetail = async(id) => {
    const res = await CustomAxios().get(`/order-details/api/delete-order-detail/${id}`);
    return res;
};

//Cap nhat san pham yeu thich/gio hang
export const updateOrderDetail = async(_id, quantity, price, isCmt, idOrder, idSubProduct) => {
    const data = {
        _id, quantity, price, isCmt, idOrder, idSubProduct
    }
    const res = await CustomAxios().post(`/order-details/api/update-order-detail`, data);
    return res;
};












