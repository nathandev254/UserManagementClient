import React, { useContext } from "react";
import "./Login.css";
import signin from "../assets/signin.svg";
import { usercontext } from "../context/Usercontext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { ApiDomain } from "../utils/Domain";

function Login() {
  const navigate = useNavigate()
  const {dispatch} = useContext(usercontext)

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(5).max(15).required(),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = (data) => {
    Axios.post(`${ApiDomain}/login`,data)
    .then(({data}) => {
      if(data.token){
        dispatch({type:'LOGIN_SUCCESS', payload:data})
        navigate('/Home')
      }
      
    })
    .catch(({response}) => {
      console.log(response)
    })
  };

  return (
    <div className="Login--page">
      <div className="login">
        <h1>Welcome Back</h1>
        <a href="#" className="login--google">
          Login with Google
        </a>
        <p>login with email</p>
        <form action="" onSubmit={handleSubmit(onsubmit)}>
          <input
            type="text"
            name=""
            id=""
            placeholder="username = kevin23"
            {...register("username")}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="password = 123456789"
            {...register("password")}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="confirmpassword = 123456789"
            {...register("confirmpassword")}
          />
          <div className="checkbox-container">
            <div className="check-box">
              <input type="checkbox" id="remember" name="remember" />
              <span>Remember Me</span>
            </div>
            <div>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className="signup">
          <span>dont you have an account yet</span>
          <a href="">Register</a>
        </div>
      </div>
      <div className="login--illustrator">
        <img src={signin} alt="" srcSet="" />
      </div>
    </div>
  );
}

export default Login;
