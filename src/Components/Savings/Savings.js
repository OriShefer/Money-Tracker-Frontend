import { useEffect } from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';

import Saving from '../Saving/Saving';

import './Savings.css';


function Savings() {

    const { getLastSavings, lastSavings } = useGlobalContext();

    useEffect(() => {
        getLastSavings();
    }, []);

  return (
    <div>
        <label className='saving-title'>Your Savings</label>
        {lastSavings.map((saving) => (
            <Saving
            key = {saving.id}
            name = {saving.name}
            currentAmount = {saving.currentAmount}
            destinationAmount = {saving.destinationAmount}
            />
        ))}

    </div>
  );
}

export default Savings;
