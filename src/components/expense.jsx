import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstancs";
function Expense() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [expense, setExpense] = useState({
    expenseTitle: "",
    expenseAmount: 0,
  });
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate()
const baseUrl='http://localhost:8000/api/v1/'
  const addAmount = async () => {
    setTotalAmount(totalAmount + amount);
    setAmount(0);

    try {
      await axiosInstance.post(`${baseUrl}expense/add`, {
        totalAmount: totalAmount + amount,
        expenses,
      });

      // After updating the data in the database, fetch the latest data from the database
      await getFromDb();
    } catch (error) {
      console.log(error);
    }
  };

  const addExpense = async () => {
    setTotalAmount(totalAmount - expense.expenseAmount);
    setExpenses([...expenses, expense]);
    setExpense({
      expenseTitle: "",
      expenseAmount: 0,
    });

    try {
      await axiosInstance.post(`${baseUrl}expense/add`, {
        totalAmount: totalAmount - expense.expenseAmount,
        expenses: [...expenses, expense],
        userid: "123456789",
      });

      // After updating the data in the database, fetch the latest data from the database
      await getFromDb();
    } catch (error) {
      console.log(error);
    }
  };
  const isLoggedIn = async () => {
    try {
      const { data } = await axiosInstance.get(`${baseUrl}elite/isLoggedin`);
      return data.isLoggedIn;
      console.log(data)
    } catch (error) {
      console.log(error);
      return false;
    }
  };
    const getFromDb = async () => {
    try {
      const datas = await axiosInstance.get(`${baseUrl}expense/get`);
      console.log(datas)
      if (datas) {
        setTotalAmount(datas.data.expensedata.totalAmount);
        setExpenses(datas.data.expensedata.expenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(totalAmount);
  console.log(expenses);

  useEffect(() => {
    getFromDb();
  }, []);
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (!loggedIn) {
          // If user is not logged in, navigate to /login
          navigate("/login");
        } else {
          // If user is logged in, fetch data from the database
          getFromDb();
        }
      } catch (error) {
        // Handle the error
        console.log(error);
      }
    };

    checkLoggedIn();
  }, [navigate]);

  console.log(expenses);

  


  return (
    <div className=" bg-[#C5DFF8]">
      <div className="w-full h-[10%] pt-5 flex items-center justify-center">
        <div>
          <h1 className="font-bold   text-center text-3xl text-[#0c0c10]">
            Expense Tracker
          </h1>
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-[100vh]">
        <div className=" w-[90%] lg:w-[50%] p-5 lg:min-h-[400px] min-h-[80%] h-auto relative bg-[#f5f5f5]">
          <div className="w-full grid grid-cols-1 gap-4">
            <div className="w-full mt-5 border flex  justify-start pl-4 items-center border-slate-400 h-[50px]  mx-auto">
              <p>
                Amount Left{" "}
                <span className="font-bold text-3xl">{totalAmount}</span>
              </p>
            </div>
            <div className="w-full flex">
              <div className="w-[80%]">
                {" "}
                <TextField
                  fullWidth
                  label="Add Amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  variant="outlined"
                />
              </div>
              <div
                onClick={addAmount}
                className="w-[20%] bg-black text-[2rem] text-center font-extrabold text-white"
              >
                +
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <h2 className="mb-2 text-xl font-bold">Add Expense</h2>
              <TextField
                fullWidth
                label=" Expense Title"
                value={expense.expenseTitle}
                onChange={(e) => {
                  setExpense({
                    ...expense,
                    expenseTitle: e.target.value,
                  });
                }}
                variant="outlined"
              />
              <div className="w-full flex">
                <div className="w-[80%]">
                  {" "}
                  <TextField
                    value={expense.expenseAmount}
                    onChange={(e) => {
                      console.log(e)
                      setExpense({
                        ...expense,
                        expenseAmount: Number(e.target.value),
                      });
                    }}
                    fullWidth
                    label="Amount"
                    variant="outlined"
                  />
                </div>
                <div
                  onClick={addExpense}
                  className="w-[20%] bg-black text-[2rem] font-extrabold text-center text-white"
                >
                  +
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-xl font-bold">Spends Tracking</h2>
              {expenses.length ? (
                expenses.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item.expenseTitle}</p>
                      <p>-{item.expenseAmount}</p>
                    </div>
                  );
                })
              ) : (
                <div>No expense found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expense;
