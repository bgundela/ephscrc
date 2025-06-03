import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom'
import CounselorEvent from '../components/CounselorEvent'
import { IDContext } from '../context/IDContext';

const CounselorHomePage = () => {
    const [events, setEvents] = useState([])
    const [userEvents, setUserEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const { ID, setID } = useContext(IDContext)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
                loadedEvents.sort((a, b) => {
                    return new Date(parseInt(a.year), months.indexOf(a.month), parseInt(a.day)) - new Date(parseInt(b.year), months.indexOf(b.month), parseInt(b.day))
                })
                setEvents([...loadedEvents])
                if (events !== '') {
                    setLoading(false)
                }
            })
        } else {
            alert('Something went wrong. Please try again later. If issue persists, contact support.')
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [loading])

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
        )
    }

    if (ID !== 'abbygee') {
        return (
            <Navigate to='/home' />
        )
    }

    return (
        <div className='homePage'>
            <div className='counselor-header'>
                <div className='counselor-greeting'>
                    <h1 className='bold-font welcome'>Welcome,</h1>
                    <h1 className='red bold-font welcome'>Abby Gee</h1>
                </div>
                <div>
                    <div className='profile'>
                        <h2 className='profile-icon regular-font'>AG</h2>

                        <svg onClick={(e) => logout(e)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="logout">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='events'>
                <div className='events-header'>
                    <h1 className='regular-font events-title'>Open Events</h1>
                    <Link to='/calendar' state={{ events: events }} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='events-arrow'>
                            <path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
                        </svg>
                    </Link>
                </div>
                <div className=''>
                    {(events.length === 0) && (
                        <h2>You haven't created any events yet! Get on that!</h2>
                    )}
                    {(events.length > 0) && events.map(event =>
                        <div>
                            <CounselorEvent month={event.month} day={event.day} title={event.title} rep={(event.type === 'College Rep Visit')} time={event.time} year={event.year} ID={event._id} attendees={event.attendees} />
                        </div>
                    )}
                </div>
                <div className='add-button-parent'>
                    <Link to='/createEvent'>
                        <h1 className='add-button'>+</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CounselorHomePage