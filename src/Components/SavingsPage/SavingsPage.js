import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import React from "react";
import SavingForm from "../SavingForm/SavingForm";
import './SavingsPage.css'

function SavingsPage() {

  return (
    <React.Fragment>
      <div className="card me-5 savings-page">
        <div className="card-body">
          <h1 className="card-title">Savings</h1>
          <SavingForm />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SavingsPage;
