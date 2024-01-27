import axios from "axios";
import {loginStart , loginSuccess , loginFailure , logout} from "./userReducer";

//Login
export const login = async(dispatch , user)=>{
    dispatch(loginStart());
    try {
             const res = await axios.post("http://localhost:5000/api/user/login" , user);
             dispatch(loginSuccess(res.data)); 
    } catch (error) {
              dispatch(loginFailure());
    }
}

//verify email
export const VerifyEmail = async(dispatch , user)=>{
    dispatch(loginStart());
    try {
             const res = await axios.post("http://localhost:5000/api/user/verify/email" , user);
             dispatch(loginSuccess(res.data)); 
    } catch (error) {
              dispatch(loginFailure());
    }
}

//signup or Create User 
export const signup = async(dispatch , user)=>{
    dispatch(loginStart());
    try {
             const res = await axios.post("http://localhost:5000/api/user/create/user" , user);
             dispatch(loginSuccess(res.data)); 
    } catch (error) {
              dispatch(loginFailure());
    }
}