import Sidebar from "./Components/Sidebar/Sidebar";
import Content from "./Components/Content/Content";
import TransactionsPage from "./Components/TransactionsPage/TransactionsPage";
import { useGlobalContext } from "./Context/GlobalContext";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import SavingsPage from "./Components/SavingsPage/SavingsPage";

function App() {
  const { INCOME, EXPENSE } = useGlobalContext();
  const [active, setActive] = useState(2);



  return (
    <Routes>
      <Route path="/" exact element = {<> <Sidebar active = {1} /> <Content /> </> }/>
      <Route path="/add-income" exact  element ={<>  <Sidebar active = {2} /> <TransactionsPage type = {INCOME}/></>} />
      <Route path="/add-expense" exact element = {<> <Sidebar active = {3}/> <TransactionsPage type={EXPENSE}/> </>}/>
      <Route path="/add-saving" exact element = {<> <Sidebar active = {4}/> <SavingsPage/> </>}/>
      <Route path="*" element = {<> <Sidebar active = {1} /> <Content /> </> }/>
    </Routes>
  );
}

export default App;
