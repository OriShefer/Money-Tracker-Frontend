import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import "./TransactionsPage.css";
import TransactionsForm from "../TransactionForm/TransactionForm";
import React from "react";

function TransactionsPage(props) {
  const {
    getIncomeAmount,
    incomeTotalAmount,
    getExpenseAmount,
    expenseTotalAmount,
    INCOME,
    EXPENSE,
    setTextColor,
  } = useGlobalContext();

  const [added, setAdded] = useState(false);

  const [title, setTitle] = useState();
  const [totalTitle, setTotalTitle] = useState();
  let amount = '';

  useEffect(() => {
    if(props.type === INCOME){
      getIncomeAmount();
      setTitle("Incomes");
      setTotalTitle("Total Incomes:");
    }

    if(props.type === EXPENSE){
      getExpenseAmount();
      setTitle("Expenses");
      setTotalTitle("Total Expenses:");
    }
  
  }, [added]);

  return (
    <React.Fragment>
      <div className="card me-5 transactions-page">
        <div className="card-body">
          <h1 className="card-title"> {title}</h1>
          <div style={{ fontSize: "2rem" }} className="card-text">
            <div className="card me-5 ">
              <div style={{ textAlign: "center" }} className="card-body ">
                {totalTitle + " "}
                <span style={{ color: setTextColor(props.type), fontWeight: "bold" }} >
                  {expenseTotalAmount}{incomeTotalAmount}₪
                </span>
              </div>
            </div>
          </div>
          <TransactionsForm type = {props.type} setAdded={setAdded} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TransactionsPage;
