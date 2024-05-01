import React, { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import {Context} from '../../Context/Context'
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

export default function GoogleAuth() {

  const { dispatch } = useContext(Context)
  const { pathname } = useLocation()
    console.log(pathname)

  const LoginGoo = async ({email, given_name, picture, sub})=>{
    dispatch({ type: "LOGIN_START"})
    try {
      console.log({email, given_name, picture, sub})
      const res = await api.post("/userg", {email, given_name, picture, sub})
      console.log(res)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data})
      if(pathname === "/login" || pathname === "/"){
        window.location.replace("/");
      }else{
        window.location.replace(`${pathname}`);
      }
    } catch (error) {
      
    }
  }

useGoogleOneTapLogin({
  onSuccess: credentialResponse => {
    const { email, given_name, picture, sub } = jwtDecode(credentialResponse?.credential);
    LoginGoo({email, given_name, picture, sub});
  },
  onError: () => {
    console.log('Login Failed');
  },
});



  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        const { email, given_name, picture, sub } = jwtDecode(credentialResponse?.credential);
        LoginGoo({email, given_name, picture, sub});
        
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  )
}
