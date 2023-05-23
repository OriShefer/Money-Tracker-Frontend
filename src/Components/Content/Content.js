import Statistics from "../Statistics/Statistics";
import Balance from "../Balance/Balance";
import Chart from "../Chart/Chart";
import Header from "../Header/Header";
import LastTransactions from "../LastTransactions/LastTransactions";
import Savings from "../Savings/Savings";

import React from "react";

import "./Content.css";

function Content() {
  return (
    <React.Fragment>
      <div className="content">
        <Header />
        <Balance />
        <div className="chart-stats-con">
          <Chart />
          <Statistics/>
        </div>
        <div className="saving-last-con">
          <Savings />
          <LastTransactions />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Content;
