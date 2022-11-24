import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosApi } from "../utils/axiosApi";

const Confirm = () => {
  const { activatecode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axiosApi.post(`/api/verifyuser/${activatecode}`);
        toast.success(res.data.msg);
        navigate("/login");
      } catch (err) {
        if (err.response.data) {
          toast.error(err.response.data.msg);
        } else {
          toast.error(err.message);
        }
      }
    };
    verifyEmail();
  }, [activatecode, navigate]);
  return <div>Confirm</div>;
};

export default Confirm;
