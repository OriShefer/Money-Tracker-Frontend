import moment from "moment";

import "./Header.css";
import { useEffect, useState } from "react";



function Header() {

  const [headerTitle, setHeaderTitle] = useState()

  const setGreeting = () => {
    moment.locale("en-il"); 
    const hour = parseInt(moment().format('HH').substring(0,2)); 

    if((hour >= 0 && hour < 7) || hour >= 22){
      setHeaderTitle('Good Night, Ori')
    }

    if(hour >= 7 && hour < 12){
      setHeaderTitle('Good Morning, Ori')
    }

    if(hour >= 12 && hour < 18){
      setHeaderTitle('Good Afternoon, Ori')
    }

    if(hour >= 18 && hour < 22){
      setHeaderTitle('Good Evening, Ori')
    }

  };

  useEffect(() => {
    setGreeting()
  },[])

  return (
    
    <div className="container">
      <img src={process.env.PUBLIC_URL + 'img/user.png'} width="50rem" height="50rem"/> 
      <div>
      <h1>{headerTitle}</h1>
      <h4>Welcome back, nice to see you again!</h4>
      </div>
      
    </div>
    
  );
}

export default Header;
