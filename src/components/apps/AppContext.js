import React, { createContext, useContext, useState } from 'react'
import {
  //Category & Brand
  getCategories, getBrandsByIdCategory,
  //Product, subProduct
  getProducts, getSubProductsByIdProduct, getSubProducts,
  //Picture
  getPicturesByIdProduct,addPicture,upLoadPicture,
  //Order
  addOrder, getOrdersByIdUser, updateOrder,

  //Cart
  addToCart, get_order_details_by_idOrder, update_order_details, delete_order_details,

  //OrderDetail
  getOrderDetailsByIdOrder, getOrderDetails,
  //Review
  getReviews, getReviewsById,addReview,
  //Address
  getAddressByIdUser, addAddress, updateAddress, deleteAddress,

  //Promotion
  getPromotions,
  getPictures,

} from './AppService';
import { UserContext } from '../users/UserContext';

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
  const [countOrder, setCountOrder] = useState(0);
  const [countOrderDetail, setCountOrderDetail] = useState(0);
  const [total, setTotal] = useState(0);
  const [ship, setShip] = useState(5);
  const [listCmt, setListCmt] = useState([]);
  const [countAddress, setCountAddress] = useState(0);
  const [tempIdProduct, setTempIdProduct] = useState();
  const [tempIdSubProduct, setTempIdSubProduct] = useState();
  const [quantity, setQuantity] = useState(0);


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

  //Them san pham vao gio hang
  const onAddToCart = async (quantity, price, idOrder, idSubProduct) => {
    try {
      let _listCart = [];
      const resOrderDetail = await getOrderDetailsByIdOrder(idOrder);
      const resSubProduct = await onGetSubProductById(idSubProduct);
      if (resOrderDetail) {
        _listCart = resOrderDetail.data;
        console.log('_listCart: ', _listCart);
      }

      for (const item of _listCart) {
        if (item.idSubProduct === idSubProduct) {
          console.log("Sản phẩm đã có trong giỏ hàng");
          const isCmt = 'false'
          const newQuantity = item.quantity + quantity < 300 ? item.quantity + quantity : 300;
          if (newQuantity === 300) {
            console.log("Số lượng sản phẩm trong giỏ hàng đã đạt tối đa");
          }
          const respone = await update_order_details(item._id, newQuantity, price, isCmt, idOrder, idSubProduct);
          if (respone) {
            console.log("Đã cập nhật sản phẩm trong giỏ hàng của bạn, vui lòng kiểm tra lại");
          } else {
            console.log("Cập nhật sản phẩm trong giỏ hàng thất bại");
          }
          onReloadCart();
          return respone;
        }
      }
      const respone = await addToCart(quantity, price, idOrder, idSubProduct);
      onReloadCart();
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

  //Lay danh sach order detail by idOrder
  const onGetOrderDetailByIdOrder = async (idOrder) => {
    try {
      const res = await getOrderDetailsByIdOrder(idOrder);
      return res;
    } catch (error) {
      console.log("onGetOrderDetailByIdOrder", error);
    }
  }

  //Lay danh sach order detail
  const onGetOrderDetails = async () => {
    try {
      const res = await getOrderDetails();
      return res;
    } catch (error) {
      console.log("onGetOrderDetails", error);
    }
  };

  //-------------------------------------------------Order-------------------------------------------------
  //Them order
  const onAddOrder = async (dateCreate, datePayment, totalPrice, status, paymentMethod, address, idUser) => {
    try {
      const res = await addOrder(dateCreate, datePayment, totalPrice, status, paymentMethod, address, idUser);
      return res;
    } catch (error) {
      console.log('onAddOrder error: ', error);
    }
  };

  //Lay danh sach order by idUser
  const onGetOrdersByIdUser = async (idUser) => {
    try {
      const res = await getOrdersByIdUser(idUser);
      return res;
    } catch (error) {
      console.log('onGetOrdersByIdUser error: ', error);
    }
  };

  //Cap nhat order
  const onUpdateOrder = async (_id, datePayment, status) => {
    try {
      const res = await updateOrder(_id, datePayment, status);
      return res;
    } catch (error) {
      console.log('onUpdateOrder error: ', error);
    }
  };

  //-------------------------------------------------Picture-------------------------------------------------
  //Lay tat ca picture theo idProduct
  const onGetPicturesByIdProduct = async (idSubProduct) => {
    try {
      const res = await getPicturesByIdProduct(idSubProduct);
      return res;
    } catch (error) {
      console.log('onGetPicturesByIdProduct error: ', error);
    }
  };


  //Lay tat ca picture
  const onGetPictures = async () => {
    try {
      const res = await getPictures();
      return res;
    } catch (error) {
      console.log('onGetPictures error: ', error);
    }
  };

  // //Lay pictures theo idReview
  // const onGetPictureByIdReview = async (idReview) => {
  //   try {
  //     const res = await get_pictures_by_idReview(idReview);
  //     return res;
  //   } catch (error) {
  //     console.log('Error get pictures by idProduct: ' + error.message);
  //   }
  // };



  //Lay hinh anh theo idReview
  const onGetPicturesByIdReview = async (idReview) => {
    try {
      const res = await onGetPictures();
      const listPictures = res.data.map(item => item.url);
      console.log('lisst picture review:', listPictures);
      return listPictures;
    } catch (error) {
      console.log('onGetPicturesByIdReview error: ', error);
    }
  };

  //Them hinh anh moi
  const onAddPicture = async (url, idSubProduct, idReview) => {
    try {
      const res = await addPicture(url, idSubProduct, idReview);

      return res;
    } catch (error) {
      console.log('onAddPicture error: ', error);
    }
  }

  //Upload hinh anh
  const onUploadPicture = async (image) => {
    try {
      const response = await upLoadPicture(image);
      if (response.data != null || response.data != undefined) {
        return response;
      }
      return null;
    } catch (error) {
      console.log(error);
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
  //Lay danh tat ca review
  const onGetReviews = async () => {
    try {
      const res = await getReviews();
      return res;
    } catch (error) {
      console.log('onGetReviews error: ', error);
    }
  };
  //Them review moi
  const onAddReview = async (time, content, rating, idUser, idProduct) => {
    try {
      const res = await addReview(time, content, rating, idUser, idProduct);
      return res;
    } catch (error) {
      console.log('onAddReview error: ', error);
    }
  }

  //Reload giỏ hàng
  const onReloadCart = () => {
    if (countCart == 0) {
      setCountCart(1);
    }
    else {
      setCountCart(0);
    }
  };

  //Reload danh sách sản phẩm yêu thích
  const onReloadFavorite = () => {
    if (countFavorite == 0) {
      setCountFavorite(1);
    }
    else {
      setCountFavorite(0);
    }
  };

  //-------------------------------------------------Promotion-------------------------------------------------
  //Lay danh sach promotion
  const onGetPromotions = async (idUser) => {
    try {
      const res = await getPromotions(idUser);
      return res;
    } catch (error) {
      console.log('onGetPromotions error: ', error);
    }
  };

  return (
    <AppContext.Provider value={{
      //Category & Brand
      onGetCategories, onGetBrandsByIdCategory,
      //Product
      onGetProducts, onGetProductById, onGetSubProductsByIdProduct, onGetSubProducts, onAddToCart, onGetSubProductById, onReloadFavorite,
      //Cart
      onGetOrderDetailsByIdOrder, onUpdateOrderDetail, onDeleteOrderDetail, onReloadCart,
      //Reviews
      onGetReviews, onAddReview,
      //Picture
      onGetPicturesByIdProduct, onGetPictures, onUploadPicture, onAddPicture, onGetPicturesByIdReview,
      //OrderDetail
      onGetOrderDetailByIdOrder,
      onDeleteOrderDetail, onUpdateOrderDetail, onGetOrderDetails,
      //Order
      onAddOrder, onGetOrdersByIdUser, onUpdateOrder,
      //Address
      onAddAddress, onGetAddressByIdUser, onUpdateAddress, onDeleteAddress,
      //Review
      onGetReviewsByIdProduct,
      //Promotion
      onGetPromotions,

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
      countOrder, setCountOrder,
      countOrderDetail, setCountOrderDetail,
      total, setTotal,
      ship, setShip,
      listCmt, setListCmt,
      tempIdProduct, setTempIdProduct,
      tempIdSubProduct, setTempIdSubProduct
    }}>
      {children}
    </AppContext.Provider>
  )
}
