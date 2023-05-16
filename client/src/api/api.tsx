import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import User from "./User";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
})

export const addUser = async (payload: any) => {
  try {
    await api.post('/user', payload);
    return true;
  } catch (error) {
    return false;
  }
};

export const verifyUser = async (payload: any) => {
  try {
    await api.get('/verify', {params: payload});
    return true;
  } catch (error) {
    return false;
  }
}

export const updateUser = (payload: any) => {
  api.put('/user', payload);
}

export const getUser = (payload: any, setUserData: Dispatch<SetStateAction<User | null>>) => {
  api.get("/user", {params: payload})
    .then((response) => {
      setUserData(response.data);
    }).catch((error) => {
      setUserData(null);
    });
}

export default {
  addUser,
  verifyUser,
  updateUser,
  getUser
}