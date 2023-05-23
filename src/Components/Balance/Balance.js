import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';

import Sum from "../Sum/Sum";
import "./Balance.css";


function Balance() {

  const {getIncomeAmount,incomeTotalAmount,getExpenseAmount,expenseTotalAmount} = useGlobalContext();
  const [total,setTotal] = useState(0);

  useEffect(() => {
    getIncomeAmount()
    getExpenseAmount()
  },[])

  useEffect(() => {
    setTotal(incomeTotalAmount - expenseTotalAmount)
  },[incomeTotalAmount,expenseTotalAmount])

  return (
    <div className='balance'>
      <Sum title={"Income"} amount={incomeTotalAmount} />
      <Sum title={"Expense"} amount={expenseTotalAmount} />
      <Sum title={"Total"} amount={total} />
    </div>
  );
}

export default Balance;
