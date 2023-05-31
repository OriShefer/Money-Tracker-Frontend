import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';

import Sum from "../Sum/Sum";
import "./Balance.css";


function Balance() {

  const {getMonthlyIncomeAmount,monthlyIncomeTotalAmount,getMonthlyExpenseAmount,monthlyExpenseTotalAmount} = useGlobalContext();
  const [total,setTotal] = useState(0);

  useEffect(() => {
    getMonthlyIncomeAmount()
    getMonthlyExpenseAmount()
  },[])

  useEffect(() => {
    setTotal(monthlyIncomeTotalAmount - monthlyExpenseTotalAmount)
  },[monthlyIncomeTotalAmount,monthlyExpenseTotalAmount])

  return (
    <div className='balance'>
      <Sum title={"Income"} amount={monthlyIncomeTotalAmount} />
      <Sum title={"Expense"} amount={monthlyExpenseTotalAmount} />
      <Sum title={"Total"} amount={total} />
    </div>
  );
}

export default Balance;
