import React, {useContext, useState } from "react"
import axios from 'axios'


//const BASE_URL = "http://localhost:3000/api/";
const BASE_URL = "https://money-tracker-backend-zdl7.onrender.com/api/";
const INCOME = 'income'
const EXPENSE = 'expense'
const CATEGORY = 'category'
const SAVING = 'saving'
const TRANSACTION = 'transaction'


const GlobalContext = React.createContext()

export const GlobalProvider = (props) => {

    const [incomes,setIncomes] = useState([])
    const [expenses,setExpenses] = useState([])

    const [incomeTotalAmount, setIncomeTotalAmount] = useState([])
    const [expenseTotalAmount, setExpenseTotalAmount] = useState([])

    const [incomesByCategoryAmount, setIncomesByCategoryAmount] = useState([])
    const [expensesByCategoryAmount, setExpensesByCategoryAmount] = useState([])

    const [lastTransactions,setLastTransactions] = useState([])

    const [incomeCategories,setIncomeCategories] = useState([])
    const [expenseCategories,setExpenseCategories] = useState([])

    const [lastSavings,setLastSavings] = useState([])

    const [error, setError] = useState([])

    
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}${INCOME}/get-incomes`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
            setIncomes(response.data);
    }

    const getExpenses =  async () => {
        const response = await axios.get(`${BASE_URL}${EXPENSE}/get-expenses`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
            setExpenses(response.data);
    }


    const getIncomeAmount = async () => {
        const response = await axios.get(`${BASE_URL}${INCOME}/get-incomes`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
           
        let totalAmount = 0;
        response.data.forEach((income) => {totalAmount+=income.amount});
        setIncomeTotalAmount(totalAmount);

    }

    const getExpenseAmount = async () => {
        const response = await axios.get(`${BASE_URL}${EXPENSE}/get-expenses`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
        let totalAmount = 0;
        response.data.forEach((expense) => {totalAmount+=expense.amount});
        setExpenseTotalAmount(totalAmount);
    }

    const getIncomesByCategoryAmount = async () => {
        const response = await axios.get(`${BASE_URL}${INCOME}/get-incomes-category`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
        setIncomesByCategoryAmount(response.data);
    }
    
    const getExpensesByCategoryAmount = async () => {
        const response = await axios.get(`${BASE_URL}${EXPENSE}/get-expenses-category`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
        setExpensesByCategoryAmount(response.data);
    }

    const getIncomeCategories =  async () => {
        const response = await axios.get(`${BASE_URL}${CATEGORY}/get-income-categories`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
        setIncomeCategories(response.data)
    }

    const getExpenseCategories =  async () => {
        const response = await axios.get(`${BASE_URL}${CATEGORY}/get-expense-categories`)
            .catch((err) =>{
                setError(err.response.data.message)
            });
        setExpenseCategories(response.data)
    }

    const addCategory =  async (body) => {
        await axios.post(`${BASE_URL}${CATEGORY}/add-category`,body)
            .catch((err) =>{
                setError(err.response.data.message)
            });
    }


    const getLastTransactions = async () => {
        const response = await axios.get(`${BASE_URL}${TRANSACTION}/get-last-transactions`)
        .catch((err) =>{
            setError(err.response.data.message)
        });
        let transactions = response.data.map((transaction) => {
            return ({
                id: transaction._id,
               category: transaction.category,
               title: transaction.title,
               type: transaction.type,
               amount: transaction.amount,
               date: transaction.date
        });
            
        })
        setLastTransactions(transactions);
    }

    const addTransaction = async (body) => {
        await axios.post(`${BASE_URL}${TRANSACTION}/add-transaction`, body)
        .catch((err) =>{
            setError(err.response.data.message)
        });

    }

    const getLastSavings = async () => {
        const response = await axios.get(`${BASE_URL}${SAVING}/get-last-savings`)
        .catch((err) =>{
            setError(err.response.data.message)
        });
        let savings = response.data.map((saving) => {
            return ({
                id: saving._id,
                name: saving.name,
                currentAmount: saving.currentAmount,
                destinationAmount: saving.destinationAmount
        });
            
        })
        setLastSavings(savings);
    }

    const getAllSavings = async () => {
      const response = await axios.get(`${BASE_URL}${SAVING}/get-all-savings`)
      .catch((err) =>{
          setError(err.response.data.message)
      });
      let savings = response.data.map((saving) => {
          return ({
              id: saving._id,
              name: saving.name,
              currentAmount: saving.currentAmount,
              destinationAmount: saving.destinationAmount
      });
          
      })

      setLastSavings(savings);
    }

    const addSaving = async (body) => {
      await axios.post(`${BASE_URL}${SAVING}/add-saving`,body)
      .catch((err) =>{
          setError(err.response.data.message)
      });
      
    }

    const updateSaving = async (body) => {
      await axios.patch(`${BASE_URL}${SAVING}/update-saving`,body)
      .catch((err) =>{
          setError(err.response.data.message)
      });
      
    }




    const setTextColor = (type) => {
    
        type = type.toLowerCase();
        let textColor = 'black';
        if(type === INCOME){
            textColor = "green";
          }
          if(type === EXPENSE){
            textColor = "red";
          }

          return textColor;
    }


    return (
        <GlobalContext.Provider value={{
            getIncomes,
            incomes,
            getExpenses,
            expenses,
            getIncomeAmount,
            incomeTotalAmount,
            getExpenseAmount,
            expenseTotalAmount,
            getIncomesByCategoryAmount,
            incomesByCategoryAmount,
            getExpensesByCategoryAmount,
            expensesByCategoryAmount,
            getIncomeCategories,
            incomeCategories,
            getExpenseCategories,
            expenseCategories,
            addCategory,
            getLastTransactions,
            lastTransactions,
            addTransaction,
            getLastSavings,
            getAllSavings,
            lastSavings,
            addSaving,
            updateSaving,
            setTextColor,
            INCOME,
            EXPENSE

        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
