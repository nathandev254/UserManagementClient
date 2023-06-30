import React from "react";
import "./AddEmployee.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ApiDomain } from "../utils/Domain";

function AddEmployee() {
  const navigate = useNavigate()

  const schema = yup.object().shape({
    username: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(15).required(),
  });

  const { register, handleSubmit,reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    Axios.post(`${ApiDomain}/employee`, data)
    .then(response => {
      console.log('Data posted successfully:', response.data);
      reset()
      navigate('/ManageEmployee')
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
  };

  return (
    <div className="Add--Employee">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="username" {...register("username")} />
        <input type="text" placeholder="firstname" {...register("firstname")} />
        <input type="text" placeholder="lastname" {...register("lastname")} />
        <input type="email" placeholder="email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <button className="Submit" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
