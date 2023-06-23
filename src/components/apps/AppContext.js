import React, { createContext, useContext, useState } from 'react'
import {
  //Category & Brand
  getCategories, getBrandsByIdCategory,
  //Product, subProduct
  getProducts, getSubProductsByIdProduct, getSubProducts,
  //Picture
  getPicturesByIdProduct,
  //Cart
  addToCart, get_order_details_by_idOrder, update_order_details, delete_order_details,
  //Favorite

  //OrderDetail
  addOrderDetail, getOrderDetailsByIdOrder,
  //Review
  getReviews, getReviewsById,
  //Address
  getAddressByIdUser, addAddress, updateAddress, deleteAddress,

} from './AppService';
import { UserContext } from '../users/UserContext';
//import { UserContext } from '../users/UserContext';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext);
  const [listCart, setListCart] = useState([]);
  const [listFavorite, setListFavorite] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [listProcessing, setListProcessing] = useState([]);
  const [listDelivered, setListDelivered] = useState([]);
  const [listCanceled, setListCanceled] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [countFavorite, setCountFavorite] = useState(0);
  const [countOrderDetail, setCountOrderDetail] = useState(0);
  const [total, setTotal] = useState(0);
  const [ship, setShip] = useState(5);
  const [listCmt, setListCmt] = useState([]);
  const [countAddress, setCountAddress] = useState(0);



  const onGetCategories = async () => {
    try {
      const res = await getCategories();
      return res;
    } catch (error) {
      console.log('onGetCategories error: ', error);
    }
  };

  const onGetBrandsByIdCategory = async (idCategory) => {
    try {
      const res = await getBrandsByIdCategory(idCategory);
      return res;
    } catch (error) {
      console.log('onGetBrandsByIdCategory error: ', error);
    }
  };

  //Lay tat ca san pham
  const onGetProducts = async () => {
    try {
      const res = await getProducts();
      return res;
    } catch (error) {
      console.log('onGetProducts error: ', error);
    }
  };

  //Lay san pham theo id
  const onGetProductById = async (idProduct) => {
    try {
      const res = await getProducts();
      const product = res.data.find((item) => item._id === idProduct);
      return product;
    } catch (error) {
      console.log('onGetProductById error: ', error);
    }
  };

  //Lay tat ca sub san pham theo idProduct
  const onGetSubProductsByIdProduct = async (idProduct) => {
    try {
      const res = await getSubProductsByIdProduct(idProduct);
      return res;
    } catch (error) {
      console.log('onGetSubProductsByIdProduct error: ', error);
    }
  };

  //Lay tat ca subProducts
  const onGetSubProducts = async () => {
    try {
      const res = await getSubProducts();
      return res;
    } catch (error) {
      console.log('onGetSubProducts error: ', error);
    }
  };

  //Lấy subProduct theo id
  const onGetSubProductById = async (idSubProduct) => {
    try {
      const res = await getSubProducts();
      const subProduct = res.data.find((item) => item._id === idSubProduct);
      return subProduct;
    } catch (error) {
      console.log('onGetSubProductById error: ', error);
    }
  };

  //Lay tat ca picture theo idProduct
  const onGetPicturesByIdProduct = async (idSubProduct) => {
    try {
      const res = await getPicturesByIdProduct(idSubProduct);
      return res;
    } catch (error) {
      console.log('onGetPicturesByIdProduct error: ', error);
    }
  };

  const onGetReviews = async () => {
    try {
      const res = await getReviews();
      return res;
    } catch (error) {
      console.log('onGetReviews error: ', error);
    }
  };

  //Them san pham vao gio hang
  const onAddToCart = async (quantity, price, idOrder, idSubProduct) => {
    try {
      const respone = await addToCart(quantity, price, idOrder, idSubProduct);
      console.log("Add to cart: ", respone.data);
      if (countCart == 0) {
        setCountCart(1);
      }
      else {
        setCountCart(0);
      }
      return respone;
    } catch (error) {
      console.log("Add to cart error: ", error);
    }
  };

  //Cập nhật sản phẩm trong giỏ hàng
  const onUpdateOrderDetail = async (_id, quantity, price, isCmt, idOrder, idSubProduct) => {
    try {
      const respone = await update_order_details(_id, quantity, price, isCmt, idOrder, idSubProduct);
      if (!respone) {
        console.log("Update order detail error: ", respone);
      }
      return respone.data;
    } catch (error) {
      console.log("Update order detail error: ", error);
    }
  };

  //Xóa sản phẩm trong giỏ hàng
  const onDeleteOrderDetail = async (_id) => {
    try {
      const respone = await delete_order_details(_id);
      if (!respone) {
        console.log("Delete order detail error");
      }
      console.log("Delete order detail success");
      return true;
    } catch (error) {
      console.log("Delete order detail error: ", error);
    }
  };

  //Lay danh sach chi tiet don hang theo idOrder
  const onGetOrderDetailsByIdOrder = async (idOrder) => {
    try {
      const orderDetail = await get_order_details_by_idOrder(idOrder);
      console.log("OnGetOrderDetailByIdOrder Response: ", orderDetail.data);
      return orderDetail.data;
    } catch (error) {
      console.log("OnGetOrderDetailByIdOrder Error: ", error);
    }
  };
  //-------------------------------------------------Address-------------------------------------------------
  //Them address
  const onAddAddress = async (body, status, idUser) => {
    try {
      const res = await addAddress(body, status, idUser);
      return res;
    } catch (error) {
      console.log('onAddAddress error: ', error);
    }
  };

  //Lay danh sach address by idUser
  const onGetAddressByIdUser = async (idUser) => {
    try {
      const res = await getAddressByIdUser(idUser);
      return res;
    } catch (error) {
      console.log('onGetAddressByIdUser error: ', error);
    }
  };

  //Cap nhat address
  const onUpdateAddress = async (idAddress, body, status, idUser) => {
    try {
      const res = await updateAddress(idAddress, body, status, idUser);
      return res;
    } catch (error) {
      console.log('onUpdateAddress error: ', error);
    }
  };

  //Xoa address
  const onDeleteAddress = async (idAddress) => {
    try {
      const res = await deleteAddress(idAddress);
      return res;
    } catch (error) {
      console.log('onDeleteAddress error: ', error);
    }
  };

  //-------------------------------------------------Reviews-------------------------------------------------
  const onGetReviewsByIdProduct = async (idProduct) => {
    try {
      const res = await getReviewsById(idProduct);
      return res;
    } catch (error) {
      console.log('onGetReviewsByIdProduct error: ', error);
    }
  };

  return (
    <AppContext.Provider value={{
      //Category & Brand
      onGetCategories, onGetBrandsByIdCategory,
      //Product
      onGetProducts, onGetProductById, onGetSubProductsByIdProduct, onGetSubProducts, onAddToCart, onGetSubProductById,
      //Cart
      onGetOrderDetailsByIdOrder, onUpdateOrderDetail, onDeleteOrderDetail,
      //Reviews
      onGetReviews,
      //Picture
      onGetPicturesByIdProduct,
      //Address
      onAddAddress, onGetAddressByIdUser, onUpdateAddress, onDeleteAddress,
      //Review
      onGetReviewsByIdProduct,

      //State
      countAddress, setCountAddress,
      user,
      listCart, setListCart,
      listOrder, setListOrder,
      listProcessing, setListProcessing,
      listDelivered, setListDelivered,
      listCanceled, setListCanceled,
      countCart, setCountCart,
      countFavorite, setCountFavorite,
      listFavorite, setListFavorite,
      countOrderDetail, setCountOrderDetail,
      total, setTotal,
      ship, setShip,
      listCmt, setListCmt
    }}>
      {children}
    </AppContext.Provider>
  )
}
