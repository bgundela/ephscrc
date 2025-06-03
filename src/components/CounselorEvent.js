import React from 'react'
import { Link } from 'react-router-dom'
import SignupDateIcon from './SignupDateIcon'

const CounselorEvent = (props) => {
    const month = props.month
    const day = props.day
    const rep = props.rep
    const title = props.title
    const time = props.time
    const year = props.year
    const ID = props.ID
    const attendees = props.attendees

    const getUser = async (studentID) => {
        const response = await fetch('https://ephscrc-api.onrender.com/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(loadedUsers => {
                loadedUsers.map(user => {
                    if (user.studentID === studentID) {
                        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                    }
                })
            })
        }
    }

    return (
        <div>
            <div className='parentCounselorEvent'>
                <div className='counselorEvent'>
                    <div className='signup-main'>
                        <SignupDateIcon month={month} day={day} />
                        <h3 className='regular-font big-size'>{title}</h3>
                    </div>
                    <div className='signup-details'>
                        <h3 className={`counselorEventElement regular-font ${rep ? 'rep-visit' : 'info-meeting'} ${rep ? 'green' : 'purple'} padding-right`}>{rep ? 'College Rep Visit' : 'Informational Meeting'}</h3>
                        <h3 className='counselorEventElement regular-font time red'>{time}</h3>
                    </div>

                </div>
                <Link to='/createEvent' state={{ editTitle: title, editType: (rep ? 'College Rep Visit' : 'Informational Meeting'), id: ID, editMonth: month, editDay: day, editTime: time, editYear: year }}>
                    <h2 className='view red bold-font'>Edit</h2>
                </Link>
                <Link to='/counselorEvent' state={{ title: title, type: (rep ? 'College Rep Visit' : 'Informational Meeting'), id: ID, month: month, day: day, time: time, year: year, attendeesList: attendees }}>
                    <h2 className='view red bold-font'>View</h2>
                </Link>
            </div>
            <hr className='counselor-divider' />
        </div >
    )
}

export default CounselorEvent