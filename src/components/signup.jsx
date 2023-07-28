import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../axiosInstancs";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
const navigate = useNavigate()
  const Signupuser = async () => {
    try {
      const response = await axiosInstance.post("elite/Register", {
        email: cred.email,
        password: cred.password,
      });
      navigate('/')
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" bg-[#C5DFF8]">
        <div className="w-full h-[10%] pt-5 flex items-center justify-center">
          <div>
            <h1 className="font-bold   text-center text-3xl text-[#0c0c10]">
              Expense Tracker
            </h1>
          </div>
        </div>

        <div className="flex justify-center items-center w-full h-[100vh]">
          <div className=" w-[90%] lg:w-[50%] p-5 lg:min-h-[400px] min-h-[40%] h-auto relative bg-[#f5f5f5]">
            <div className="w-full grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4">
                <h2 className="mb-2 text-xl text-center font-bold">SignUp</h2>
                <TextField
                  fullWidth
                  label="Email"
                  value={cred.email}
                  onChange={(e) => {
                    setCred({
                      ...cred,
                      email: e.target.value,
                    });
                  }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  value={cred.password}
                  onChange={(e) => {
                    setCred({
                      ...cred,
                      password: e.target.value,
                    });
                  }}
                />
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={Signupuser}
                    className="w-[100px] h-[50px] align-middle rounded-full bg-[#003366] text-white font-bold"
                  >
                    SignUp
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
              <p>alredy user login here <Link to="/login" className="font-bold">Signup</Link></p>

              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
