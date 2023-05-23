import { useGlobalContext } from '../../Context/GlobalContext';

import './Sum.css'

function Sum(props) {

  const {setTextColor} = useGlobalContext();

  return (
    <div className="sum card me-5">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p style={{fontSize: '2rem',color: setTextColor(props.title)}} className= 'card-text'>
          {props.amount}₪
        </p>
      </div>
    </div>
  );
}

export default Sum;
