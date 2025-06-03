import React, { useState, useContext, useEffect } from 'react'
import { useLocation, Navigate, Link } from 'react-router-dom'
import Attendee from '../components/Attendee'
import { IDContext } from '../context/IDContext';

const EventPage = () => {
    const [attendees, setAttendees] = useState([])
    const location = useLocation()
    const { id = '000', title = '', type = '', month = '', day = '', year = '', time = '', attendeesList = [], getUser } = location.state ?? {}
    const { ID, setID } = useContext(IDContext)
    const [allUsers, setAllUsers] = useState([])

    const getAllUsers = async () => {
        const response = await fetch('https://ephscrc-api.onrender.com/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(loadedUsers => {
                setAllUsers([...loadedUsers])
            })
        }
    }

    const getSpecificUser = (id) => {
        var firstName = ""
        var lastName = ""
        allUsers.map(user => {
            if (user.studentID === id) {
                firstName = user.firstName
                lastName = user.lastName
            }
        })

        return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
    }

    const sendEmailToUser = async (given_id) => {
        var sendemail = given_id + "@ep-student.org"
        var sendtext = `Hello! Just a reminder: You are going to ${title} on ${month} ${day}. Excited to see you there! If you cannot make it, please visit the EPHS CRC website to un-signup. Thanks!`
        const response = await fetch('https://ephscrc-api.onrender.com/users/email', {
            method: 'POST',
            body: JSON.stringify({ sendEmail: `${sendemail}`, subject: "Event Reminder", text: `${sendtext}` }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
    }

    const emailAll = () => {
        console.log(attendeesList)
        attendeesList.map((user) => {
            console.log(user)
            sendEmailToUser(user)
        })

        alert('You have sent out a reminder email!')
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    if (ID !== 'abbygee') {
        <Navigate to='/home' />
    }

    return (
        <div className='event-page'>
            <div className='event-header'>
                <Link to='/counselorHome' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='calendar-page-arrow'>
                        <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
                    </svg>
                </Link>
                <div className='date'>
                    <h1 className='bold-font date-day'>{month}</h1>
                    <h2 className='red semibold-font date-number'>{day}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className='event-calendar-icon'>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <h1 className='red semibold-font time event-time'>{time}</h1>
                </div>

                <div className='event-title-section'>
                    <div>
                        <p className='regular-font event-title'>{title}</p>
                        <p className='bold-font event-type green'>{type}</p>
                    </div>
                </div>
            </div>
            <div className='attendees'>
                <h1 className='regular-font events-title'>Attendees</h1>
                {(attendeesList.length === 0) && (
                    <h2>Nobody has signed up for the event yet...</h2>
                )}
                {(attendeesList.length > 0) && attendeesList.map(attendee =>
                    <div>
                        <Attendee name={getSpecificUser(attendee)} email={attendee} eventID={id} attendees={attendeesList} />
                    </div>
                )}
                <div className='add-button-parent'>
                    <button onClick={emailAll} className='add-button'>
                        Email All
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EventPage