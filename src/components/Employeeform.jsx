import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Employeeform.css";
import { useContext } from "react";
import { usercontext } from "../context/Usercontext";
import Axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ApiDomain } from "../utils/Domain";

function Employeeform() {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const GetEmployee = () => {
    Axios.get(`${ApiDomain}/employee/${id}`)
      .then(({ data }) => {
        console.log(data);
        setdata(data.data[0]);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const UpdateSubmit = (data) => {
    console.log(data);
    Axios.put(`${ApiDomain}/employee/${id}`, data)
      .then((response) => {
        GetEmployee()
        navigate("/ManageEmployee");
      })
      .catch((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    GetEmployee()
  }, []);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(UpdateSubmit)}>
        <h2>User Details Update</h2>
        <input
          type="text"
          placeholder="username"
          defaultValue={data.username}
          {...register("username")}
        />
        <input
          type="text"
          placeholder="firstname"
          defaultValue={data.firstname}
          {...register("firstname")}
        />
        <input
          type="text"
          placeholder="lastname"
          defaultValue={data.lastname}
          {...register("lastname")}
        />
        <input
          type="text"
          placeholder="email"
          defaultValue={data.email}
          {...register("email")}
        />
        <input type="submit" value="update" />
      </form>
    </div>
  );
}

export default Employeeform;
