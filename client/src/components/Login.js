import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosApi } from "../utils/axiosApi";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axiosApi.post("/api/signin", user);
      toast.success(res.data.msg);
      navigate("/");
    } catch (err) {
      if (err.response.data) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="email"
        name="email"
        onChange={handleChange}
      />
      <br />
      <FormControl
        type="text"
        placeholder="password"
        name="password"
        onChange={handleChange}
      />
      <br />

      <Button type="submit">Sign In</Button>
    </Form>
  );
};

export default Login;
