import './LastTransactionHeader.css'

function LastTransactionHeader(props) {

  return (
    <>
      <th className='p-4' scope="col">{props.category}</th>
      <th className='p-4' scope="col">{props.title}</th>
      <th className='p-4' scope="col">{props.type}</th>
      <th className='p-4' scope="col">{props.date}</th>
      <th className='p-4' scope="col">{props.amount}</th>
    </>
  );
}

export default LastTransactionHeader;
