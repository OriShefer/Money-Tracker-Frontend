
import { useEffect, useReducer, useState } from "react";
import "./TransactionForm.css";
import { useGlobalContext } from "../../Context/GlobalContext";
import moment from "moment";

function reducer(state, action) {
    switch (action.type) {
      case 'changeTitle':
        return { 
            ...state,
            title: action.payload
        };
        case 'changeAmount':
        return { 
            ...state,
            amount: action.payload
        };
        case 'changeDescription':
        return { 
            ...state,
            description: action.payload
        };
        case 'changeCategory':
        return { 
            ...state,
            category: action.payload
        };
        case 'changeNewCategory':
        return { 
          ...state,
          newCategory: action.payload
      };
        case 'reset':
          return{
            ...intialState
          }

      default:
        throw new Error('Unexpected action');
    }
};


const intialState = 
{
  title: '',
  amount: '',
  description: '',
  category: '',
  newCategory: ''
}


function TransactionsForm(props) {

    const {addTransaction,getIncomeCategories,incomeCategories,getExpenseCategories,expenseCategories,addCategory,INCOME,EXPENSE} = useGlobalContext()

    const [state, dispatch] = useReducer(reducer, intialState);
    
    const [valid,setValid] = useState({
      titleValid: true,
      amountValid: true,
      categoryValid: true
    })
    
    const [categories,setCategories] = useState([])

    const [addNewCategory,setAddNewCategory] = useState(false)
    const [addCategoryValid,setAddCategoryValid] = useState(true)
    const [addedCategory,setAddedCategory] = useState(false)

    useEffect(() => {
      if(props.type === INCOME){
        getIncomeCategories()
      }

      if(props.type === EXPENSE){
        getExpenseCategories()
      }      
    },[addedCategory])

    useEffect(() => {

      if(props.type === INCOME){    
          setCategories(incomeCategories.map((category) => (
            <option key={category.name}>{category.name}</option>
          )))
      }

      if(props.type === EXPENSE){
          setCategories(expenseCategories.map((category) => (
            <option key={category.name}>{category.name}</option>
          )))
     
      }      
    },[incomeCategories,expenseCategories])


    const changeHandler = (e) => {
      e.preventDefault()

      switch (e.target.id) {
        case 'Title':
          dispatch({ type: 'changeTitle', payload: e.target.value})
          break;
          case 'Amount':
            dispatch({ type: 'changeAmount', payload: e.target.value})
            break;
          case 'Description':
            dispatch({ type: 'changeDescription', payload: e.target.value})
            break;
          case 'Category':
            dispatch({ type: 'changeCategory', payload: e.target.value})
            break;
          case 'NewCategory':
          dispatch({ type: 'changeNewCategory', payload: e.target.value})
          break;
        default:
          throw new Error('Unexpected action');
      }

    }

  

    const submitHandler = (e) => {
      e.preventDefault()

      const [title,amount,description,category] = [e.target.Title.value,e.target.Amount.value,e.target.Description.value,e.target.Category.value]
      
        setValid({
          titleValid: title? true: false,
          amountValid: amount? true: false,
          categoryValid: category!== 'Choose...'? true: false,

        })

        moment.locale("en-il"); 

        if(title && amount && category!== 'Choose...'){
          dispatch({ type: 'reset'})
          addTransaction({
            type: props.type,
            title: title,
            amount: amount,
            date: moment().format("YYYY-MM-DD"),
            category: category,
            description: description
          })
          .then(() =>  props.setAdded(prev =>!prev))
        }
    }

    const plusClickHandler = () => {
      setAddNewCategory(prev => !prev)
    }

    const addCategoryClickHandler = () => {
      let found = false
      

      categories.forEach((item) =>{
        if(item.key.toLowerCase() === state.newCategory.toLowerCase()){
          found = true
        }
      })


      if(!found){
        addCategory({
          name:state.newCategory,
          type: props.type
        }).then(() => setAddedCategory(prev => !prev))
        setAddNewCategory(prev => !prev)

      }else{
        setAddCategoryValid(false)
      }



    }


    

    const addCategoryInput = 
      <div style={{marginTop:'1.6rem'}} className="col-md-4">
        <input onChange={changeHandler} type="text" className={addCategoryValid? 'form-control': "form-control invalid"} id="NewCategory" placeholder="New Category" value={state.newCategory} />
        <button onClick={addCategoryClickHandler} className="btn btn-success btn-lg btn-block mt-4" type="button">Add Category</button>
      </div>;

    

  return (

        <div className="col-md-8 order-md-1 mt-4">
          <form onSubmit={submitHandler}>
          <div className="col-md-4 mb-3">
                <label htmlFor="Title">Title</label>
                <input onChange={changeHandler} type="text" className={valid.titleValid? 'form-control': "form-control invalid"} maxLength={20} id="Title" value={state.title}/>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="Amount">Amount</label>
              <div className="input-group mb-2">
                    <input onChange={changeHandler} type="number" className={valid.amountValid? 'form-control': "form-control invalid"} maxLength={10} id="Amount" value={state.amount}/>
                    <div className="input-group-append">
                        <div className="input-group-text">₪</div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="Description">Description <span className="text-muted">(Optional)</span></label>
              <input onChange={changeHandler} type="text" className="form-control" id="Description" value={state.description}/>

            </div>
            <div className="row">

                  <div className="col-md-4 mb-3">
                      <label htmlFor="Category">Category</label>
                      <select onChange={changeHandler} className={valid.categoryValid? "form-select": "form-select invalid"} maxLength={50} id="Category" value={state.category}>
                        <option>Choose...</option>
                        {categories}
                      </select>         
                      <button style={{marginTop:'1.8rem'}} className="btn btn-primary btn-lg" type="submit">Add</button>  
                  </div>

                  {addNewCategory? addCategoryInput:<></>}

                  <div className="col-md-4 mb-3">
                      <button onClick={plusClickHandler} type="button" className={addNewCategory?"btn btn-danger rounded-circle custom-button-danger ":"btn btn-success rounded-circle custom-button-success"}>
                        {addNewCategory?'-':'+'}
                      </button>
                  </div>

          </div>
              

          </form>
        </div>
  );
}

export default TransactionsForm;
