import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Attendee = (props) => {
    const name = props.name
    const email = props.email
    const eventID = props.eventID
    const attendees = props.attendees
    const navigate = useNavigate();
    const [newAttendees, setNewAttendees] = useState([])

    const deleteAttendee = async (e) => {
        e.preventDefault();
        let indexOf = attendees.indexOf(email)
        var updatedAttendees = attendees
        console.log(attendees)
        console.log()
        const response = await fetch('https://ephscrc-api.onrender.com/events', {
            method: 'PATCH',
            body: JSON.stringify({ id: eventID, attendees: updatedAttendees.filter(item => item !== email) }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        alert('You have deleted this attendee!')

        navigate('/counselorHome')

    }

    return (
        <div className='attendee-element'>
            <div className='attendee'>
                <div className='attendee-details'>
                    <h2 className='profile-icon regular-font'>{name}</h2>
                    <p className='regular-font attendee-email'>{`${email}@ep-student.org`}</p>
                </div>
                <svg onClick={(e) => deleteAttendee(e)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className='event-tools-right'>
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
            <hr className='counselor-divider' />
        </div>
    )
}

export default Attendee