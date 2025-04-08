import {appAxios} from './apiInterceptors';
import {BRANCH_ID} from './config';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post('/order', {
      items: items,
      branch: BRANCH_ID,
      totalPrice: totalPrice,
    });
    return response.data;
  } catch (error) {
    console.log('create order error', error);
    return null;
  }
};

export const getOrderbyId = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.log('get order by id error', error);

    return null;
  }
};

export const getOrderfromCustomerid = async (id: string) => {
  try {
    const response = await appAxios.get(`/order?customerId${id}`);
    return response.data;
  } catch (error) {
    console.log('get order by id error', error);
    return null;
  }
};

export const fetchCustomerOrders = async (userId: string) => {
  try {
    const response = await appAxios.get(`/order?customerId=${userId}`);
    return response.data;
  } catch (error) {
    console.log('fetch customer order error', error);
    return null;
  }
};

export const fetchOrders = async (
  status: string,
  userId: string,
  branchId: string,
) => {
  let uri =
    status == 'available'
      ? `/order?branch=${branchId}&status=${status}`
      : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;
     try {
        const response = await appAxios.get(uri);
        return response.data;
     } catch (error) {
         console.log("fetch delivery order error",error);
         return null;
     }

    };
