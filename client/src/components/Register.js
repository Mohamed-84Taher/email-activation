import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import { toast } from "react-toastify";
import { axiosApi } from "../utils/axiosApi";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axiosApi.post("/api/signup", user);
      toast.success(res.data.msg);
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
        placeholder="username"
        name="username"
        onChange={handleChange}
      />
      <br />
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

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default Register;
