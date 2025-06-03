import React, { useEffect, useState, useContext } from 'react';
import DateIcon from '../components/DateIcon';
import SignupDateIcon from '../components/SignupDateIcon';
import SignupElement from '../components/SignupElement';
import { Link, Navigate } from 'react-router-dom';
import { IDContext } from '../context/IDContext';

const StudentHomePage = () => {
    const date = new Date()
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [events, setEvents] = useState([])
    const [userEvents, setUserEvents] = useState([])
    const [unsignedEvents, setUnsignedEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const { ID, setID } = useContext(IDContext)
    const [allUsers, setAllUsers] = useState([])
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userRole, setUserRole] = useState('')

    const logout = (e) => {
        e.preventDefault()
        setID('')
        window.sessionStorage.setItem('ID', '')
    }

    const getAllEvents = async () => {
        const response = await fetch('https://ephscrc-api.onrender.com/events', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (response.ok) {
            response.json().then(loadedEvents => {
                var userUnsignedEvents = []
                loadedEvents.map(loadedEvent => {
                    if (!(loadedEvent.attendees.includes(ID))) {
                        userUnsignedEvents.push(loadedEvent)
                    }
                })
                userUnsignedEvents.sort((a, b) => {
                    return new Date(parseInt(a.year), months.indexOf(a.month), parseInt(a.day)) - new Date(parseInt(b.year), months.indexOf(b.month), parseInt(b.day))
                })
                setEvents([...loadedEvents])
                setUnsignedEvents([...userUnsignedEvents])

                if (events !== '') {
                    var displayEvents = []
                    events.map(event => {
                        if (event.attendees.includes(ID)) {
                            console.log(ID)
                            displayEvents.push(event)
                        }
                    })
                    displayEvents.sort((a, b) => {
                        return new Date(parseInt(a.year), months.indexOf(a.month), parseInt(a.day)) - new Date(parseInt(b.year), months.indexOf(b.month), parseInt(b.day))
                    })
                    console.log(displayEvents)
                    setUserEvents(displayEvents)
                    setLoading(false)
                }
            })

        } else {
            alert('Something went wrong. Please try again later. If issue persists, contact support.')
        }
    }

    const getUser = async () => {
        const response = await fetch('https://ephscrc-api.onrender.com/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(loadedUsers => {
                setAllUsers([...loadedUsers])
            })
            allUsers.map(user => {
                if (user.studentID === ID) {
                    setUserFirstName(user.firstName)
                    setUserLastName(user.lastName)
                    setUserRole(user.role)
                }
            })
        }
    }

    useEffect(() => {
        getUser()
        getAllEvents()
    }, [loading])



    if (ID === '') {
        return <Navigate to='/' />
    }

    if (ID === 'abbygee') {
        return <Navigate to='/counselorHome' />
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-spinner" />
            </div>
        )
    }

    return (
        <div className='homePage'>
            <div className='home-header'>
                <div className='date'>
                    <h1 className='bold-font date-day'>{weekdays[date.getDay()]}</h1>
                    <h2 className='red semibold-font date-number'>{date.getDate()}</h2>
                </div>
                <div className='profile'>
                    <h2 className='profile-icon regular-font'>{(userFirstName.charAt(0) + userLastName.charAt(0)).toUpperCase()}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="logout" onClick={(e) => logout(e)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                </div>
            </div>
            <div className='events'>
                <div className='events-header'>
                    <h1 className='regular-font events-title'>My Events</h1>
                    <Link to='/calendar' state={{ events: userEvents }} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='events-arrow'>
                            <path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
                        </svg>


                    </Link>
                </div>
                <div className='dates'>
                    {(userEvents.length === 0) && (
                        <h2>Sign up for an event to see it here!</h2>
                    )}
                    {(userEvents.length > 0) && userEvents.map(userEvent =>
                        <div>
                            <DateIcon month={userEvent.month} day={userEvent.day} />
                        </div>
                    )}
                </div>
            </div>
            <div className='signup'>
                <h1 className='signup-title regular-font'>Sign Up Now!</h1>
                <div className='signup-events'>
                    {(unsignedEvents.length === 0) && (
                        <h2>You're early! No new events to sign up for!!</h2>
                    )}
                    {(unsignedEvents.length > 0) && unsignedEvents.map(event =>
                        <div>
                            <SignupElement month={event.month} day={event.day} rep={(event.type === 'College Rep Visit')} title={event.title} time={event.time} ID={event._id} attendees={event.attendees} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}



export default StudentHomePage