import { useGlobalContext } from '../../Context/GlobalContext';

import moment from "moment";
import 'moment/locale/en-il';

import './Transaction.css'


function Transaction(props) {

  const {setTextColor} = useGlobalContext();
  moment.locale("en-il"); 
  const dateFormat = moment(props.date).format('l')

  return (
    <tr>
      <td className='p-4'>{props.category}</td>
      <td className='p-4'>{props.title}</td >
      <td className='p-4'>{props.type}</td >
      <td className='p-4'>{dateFormat}</td>
      <td className='p-4' style={{color: setTextColor(props.type)}}>{`${props.amount}₪`}</td >
    </tr>
  );
}

export default Transaction;
