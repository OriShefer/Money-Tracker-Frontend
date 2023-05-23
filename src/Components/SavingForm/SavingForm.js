
import { useEffect, useReducer, useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import moment from "moment";

function reducer(state, action) {
    switch (action.type) {
      case 'changeName':
        return { 
            ...state,
            name: action.payload
        };
        case 'changeCurrent':
        return { 
            ...state,
            currentAmount: action.payload
        };
        case 'changeDestination':
        return { 
            ...state,
            destinationAmount: action.payload
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
  name: '',
  currentAmount: '',
  destinationAmount: '',
}


function SavingForm() {

    const {updateSaving,addSaving,getAllSavings,lastSavings} = useGlobalContext()

    const [state, dispatch] = useReducer(reducer, intialState);
    
    const [valid,setValid] = useState({
      nameValid: true,
      currentAmountValid: true,
      destinationAmountValid: true
    })

    const [addedSaving,setAddedSaving] = useState(false)
    const [newSaving,setNewSaving] = useState(false)

    useEffect(() => {
        getAllSavings()
      },[addedSaving])

    const changeHandler = (e) => {
      e.preventDefault()


      switch (e.target.id) {
        case 'Name':
          if(e.target.value === 'ADD NEW SAVING'){
            setNewSaving(true)
            dispatch({ type: 'changeName', payload: ''})
          }else{
            dispatch({ type: 'changeName', payload: e.target.value})
          }
          break;
          case 'Current':
            dispatch({ type: 'changeCurrent', payload: e.target.value})
            break;
          case 'Destination':
            dispatch({ type: 'changeDestination', payload: e.target.value})
            break;
        default:
          throw new Error('Unexpected action');
      }

    }

    const nameValidCheck = (name,currentAmount,destinationAmount) => {

      let nameValid = true;
      let currentAmountValid = true;
      let destinationAmountValid = true;

      if( name === 'Choose...'){
        nameValid = false;
      }

      if(newSaving && (name === '' ||  lastSavings.find(saving => saving.name === name) !== undefined )){
        nameValid = false
      }

      if(!currentAmount){
        currentAmountValid = false;
      }

      if(!destinationAmountValid || destinationAmount <= currentAmount){
        destinationAmountValid = false;
      }


      setValid({
        nameValid: nameValid,
        currentAmountValid: currentAmountValid,
        destinationAmountValid: destinationAmountValid

      })

      return nameValid && currentAmountValid && destinationAmountValid
    }

  

    const submitHandler = (e) => {
      e.preventDefault()

      const [name,currentAmount,destinationAmount] = [e.target.Name.value,e.target.Current.value,e.target.Destination.value]

      const formValid = nameValidCheck(name,currentAmount,destinationAmount)
        

        moment.locale("en-il"); 

        if(formValid){
          dispatch({ type: 'reset'})
          if(newSaving){
            addSaving({
              name: name,
              currentAmount:currentAmount,
              destinationAmount:destinationAmount
            })
            .then(() => {
              setAddedSaving(prev =>!prev)
              setNewSaving(false)
            })

          }else{
            updateSaving({
              name: name,
              currentAmount:currentAmount,
              destinationAmount:destinationAmount
            })
            .then(() => setAddedSaving(prev =>!prev))
          }
        
        }
    }


  return (

        <div className="col-md-8 order-md-1 mt-4">
          <form onSubmit={submitHandler}>
          <div className="col-md-4 mb-3">
                <label htmlFor="Name">Name</label>
                {!newSaving?<select onChange={changeHandler} className={valid.nameValid? "form-select": "form-select invalid"} maxLength={20} id="Name" value={state.name}>
                        <option>Choose...</option>
                        {lastSavings.map((saving) => (
                         <option key={saving.name}>{saving.name}</option>
                        ))}
                        <option>ADD NEW SAVING</option>

                </select>  
                 :<input onChange={changeHandler} type="text" className={valid.nameValid? 'form-control': "form-control invalid"} maxLength={20} id="Name" value={state.name}/>}
            </div>

            <div className="col-md-4 mb-3">
              <label className="Current">Current Amount</label>
              <div className="input-group mb-2">
                    <input onChange={changeHandler} type="number" className={valid.currentAmountValid? 'form-control': "form-control invalid"} maxLength={10} min={0} id="Current" value={state.currentAmount}/>
                    <div className="input-group-append">
                        <div className="input-group-text">₪</div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
            <label htmlFor="Destination">Destination Amount</label>
                <div className="input-group mb-2">
                    <input onChange={changeHandler} type="number"  className={valid.destinationAmountValid? 'form-control': "form-control invalid"} maxLength={10} min={0} id="Destination" value={state.destinationAmount}/>
                    <div className="input-group-append">
                        <div className="input-group-text">₪</div>
                    </div>
                </div>
              

            </div>

                          
            <button style={{marginTop:'1rem'}} className="btn btn-primary btn-lg" type="submit">Add</button>  

          </form>
        </div>
  );
}

export default SavingForm;
