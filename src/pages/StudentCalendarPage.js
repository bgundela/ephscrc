import React, { useState, useEffect, useContext } from 'react'
import Calendar from '../components/calendar/calendar'
import SignupElement from '../components/SignupElement'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { IDContext } from '../context/IDContext';

const StudentCalendarPage = (props) => {
    const location = useLocation()
    const { events } = location.state ?? {}
    const [filteredEvents, setFilteredEvents] = useState([]);
    const { ID, setID } = useContext(IDContext)
    const [dataFromChild, setDataFromChild] = useState(new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const handleData = (data) => {
        setDataFromChild(data);
    };

    useEffect(() => {
        setFilteredEvents([])
        var addEvents = []
        events.map(event => {
            if ((new Date(parseInt(event.year), months.indexOf(event.month), parseInt(event.day)).getTime() === dataFromChild.getTime())) {
                addEvents.push(event)
            }
        })
        setFilteredEvents(addEvents)
    }, [dataFromChild])

    return (
        <div className='calendarPage'>
            <div className='calendar-header bold-font'>
                <Link to='/home' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='calendar-page-arrow'>
                        <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
                    </svg>
                </Link>
                <div onClick={() => console.log(dataFromChild)} className=' semibold-font calendar-title'>
                    Calendar
                </div>
            </div>
            <div className='calendar-self'>
                <Calendar eventsList={events} onDataChange={handleData} />
            </div>
            <div>
                <h1 className="goingto semibold-font">I'm going to:</h1>
            </div>
            <div className='signup'>
                <div className='signup-events'>
                    {(events.length === 0) && (
                        <h2>Sign up for an event to see it here!</h2>
                    )}
                    {(filteredEvents.length > 0) && filteredEvents.map(event =>
                        <div>
                            <SignupElement month={event.month} day={event.day} rep={(event.type === 'College Rep Visit')} title={event.title} time={event.time} ID={event._id} attendees={event.attendees} show={false} />
                        </div>
                    )}
                    {(filteredEvents.length === 0) && (
                        <h2>No events on this day.</h2>
                    )}
                </div>
            </div>
        </div >
    )
}

export default StudentCalendarPage