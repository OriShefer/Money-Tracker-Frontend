import './Saving.css'

function Saving(props) {

    const progressWidth = Math.round((props.currentAmount / props.destinationAmount) * 100)

  return (
    <div className="saving-card card me-5">
        <div className="card-body">
            <h5 className="saving-title card-title">{props.name}</h5>
            <div style={{ marginBottom:"1rem"}}>
                <img className='saving-img' src={process.env.PUBLIC_URL + 'img/salary.png'} />
                <div className='progress-content'>
                    <h4 className= 'current-amount'>{props.currentAmount}₪</h4>
                    <h4 className= 'destination-amount'>/{props.destinationAmount}₪</h4>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${progressWidth}%`}} aria-valuenow={progressWidth} aria-valuemin="0" aria-valuemax={props.destinationAmount}></div>
                    </div>
                    <h4 className= 'goal'>{`${progressWidth}% of your goal`}</h4>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Saving;
