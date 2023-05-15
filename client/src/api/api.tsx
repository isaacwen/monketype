import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
})

export const addUser = (payload: any, setShowErrorMessage: Dispatch<SetStateAction<boolean>>) => {
  api.post('/user', payload)
    .then((response) => {
      setShowErrorMessage(false);
    }).catch((error) => {
      setShowErrorMessage(true);
    })
};

export const verifyUser = (payload: any, setShowErrorMessage: Dispatch<SetStateAction<boolean>>) => {
  api.get('/user', {params: payload})
    .then((response) => {
      setShowErrorMessage(false);
    }).catch((error) => {
      setShowErrorMessage(true);
    })
}

export default {
  addUser,
  verifyUser
}