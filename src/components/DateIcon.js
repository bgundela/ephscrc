import React from 'react'

const DateIcon = (props) => {
    const month = props.month;
    const day = props.day
    return (
        <div className='date-box'>
            <h2 className='bold-font datebox-month'>{month.substring(0, 3).toUpperCase()}</h2>
            <h2 className='red datebox-day'>{day}</h2>
        </div>
    )
}

export default DateIcon