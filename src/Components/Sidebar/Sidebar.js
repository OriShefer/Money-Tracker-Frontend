
import "./Sidebar.css";



function Sidebar(props) {


  const sidebarItems = [
    {
      id: 1,
      title: 'Dashboard',
      imgLink: 'img/dashboard.png',
      link: '/',
    },
  {
      id: 2,
      title: 'Incomes',
      imgLink: 'img/income.png',
      link: '/add-income',
  },
  {
      id: 3,
      title: 'Expenses',
      imgLink: 'img/expense.png',
      link: '/add-expense',
  },
  {
    id: 4,
    title: 'Savings',
    imgLink: 'img/saving.png',
    link: '/add-saving',
}
  ];
  

  return (
<div className="sidebar d-flex flex-column p-3 bg-light position-fixed">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
    <img className="m-2" src={process.env.PUBLIC_URL + 'img/piggy-bank.png'} width="40rem" height="35rem"/> 
      <span className="fs-4">Money Tracker</span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
        
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className={ props.active === item.id ? 'active mb-2 nav-link link-dark' : 'mb-2 nav-link link-dark' }
          >
            <a href={item.link} className="title nav-link" aria-current="page">
            <img className="me-2" src={process.env.PUBLIC_URL + item.imgLink} width="30rem" height="30rem"/> 
                {item.title}
             </a>
          </li>

        ))}
    </ul>
    <hr/>
  </div>
  );
}

export default Sidebar;
