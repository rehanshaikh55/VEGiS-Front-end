import axios from "axios";
import { BASE_URL } from "./config";

export const getAllCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`, );
      return response.data
    } catch (error) {
      console.log("error while get all categories",error);
    }
  };
export const getProductByCategories = async (id:string) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`, );
      return response.data
    } catch (error) {
      console.log("error while get all categories",error);
    }
  };