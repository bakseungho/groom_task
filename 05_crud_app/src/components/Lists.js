import React from 'react'
import List from './List';

const Lists = React.memo(({ budgetData, setBudgetData, handleClick, setCalc }) => {

    
    return (
        <div className='mt-5'>
        {
            budgetData.map(data => (
                <List 
                    key={data.id}
                    id={data.id}
                    item={data.item}
                    price={data.price}
                    budgetData={budgetData}
                    setBudgetData={setBudgetData}
                    handleClick={handleClick}
                    setCalc={setCalc}
                />
            ))
        }
        </div>
    )
})

export default Lists;
