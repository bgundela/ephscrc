import React, { useState, useEffect, useContext } from 'react'
import Calendar from '../components/calendar/calendar'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { IDContext } from '../context/IDContext';

const CreateEvent = () => {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('College Rep Visit')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('0000')
    const [time, setTime] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const location = useLocation()
    const { id = '000', editTitle = '', editType = '', editMonth = '', editDay = '', editYear = '', editTime = '' } = location.state ?? {}
    const navigate = useNavigate();
    const { ID, setID } = useContext(IDContext)


    const createEvent = async (e) => {
        e.preventDefault();
        if (title !== '' || month !== '' || day !== '' || year !== '0000' || time !== '') {
            if (type) {
                setSelectedType('College Rep Visit')
            } else {
                setSelectedType('Informational Meeting')
            }

            const response = await fetch('https://ephscrc-api.onrender.com/events', {
                method: 'POST',
                body: JSON.stringify({ title, month, day, year, time, type, 'attendees': [] }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            setTitle('')
            setType(true)
            setMonth('')
            setDay('')
            setYear('0000')
            setTime('')

            navigate('/counselorHome')

        } else {
            alert('All fields are required.')
        }
    }

    const editEvent = async (e) => {
        e.preventDefault();
        if (title !== '' || month !== '' || day !== '' || year !== '0000' || time !== '') {
            if (type) {
                setSelectedType('College Rep Visit')
            } else {
                setSelectedType('Informational Meeting')
            }

            const response = await fetch('https://ephscrc-api.onrender.com/events', {
                method: 'PATCH',
                body: JSON.stringify({ id, title, month, day, year, time, type }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            setTitle('')
            setType(true)
            setMonth('')
            setDay('')
            setYear('0000')
            setTime('')

            navigate('/counselorHome')

        } else {
            alert('All fields are required.')
        }
    }

    const deleteEvent = async (e) => {
        e.preventDefault();
        if (title !== '' || month !== '' || day !== '' || year !== '0000' || time !== '') {
            if (type) {
                setSelectedType('College Rep Visit')
            } else {
                setSelectedType('Informational Meeting')
            }

            const response = await fetch('https://ephscrc-api.onrender.com/events', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            setTitle('')
            setType(true)
            setMonth('')
            setDay('')
            setYear('0000')
            setTime('')

            navigate('/counselorHome')

        } else {
            alert('All fields are required.')
        }
    }

    useEffect(() => {
        setTitle(editTitle)
        setType(editType)
        setMonth(editMonth)
        setDay(editDay)
        setYear(editYear)
        setTime(editTime)
    }, [])

    if (ID !== 'abbygee') {
        return (
            <Navigate to='/home' />
        )
    }

    if (id !== '000') {
        return (
            <div >
                <div className='create-header'>
                    <Link to='/counselorHome' >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='calendar-page-arrow'>
                            <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
                        </svg>
                    </Link>
                    <h1 className='regular-font create-title'>Edit Event</h1>
                    <button onClick={(e) => deleteEvent(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className='event-tools-right'>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <form className='create-event-page' onSubmit={(e) => editEvent(e)}>
                    <div>
                        <h2 className='bold-font section-header'>Title</h2>
                    </div>
                    <div className='login-form-text section-header'>
                        <input className='cred-box' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    <div>
                        <h2 className='bold-font section-header'>Type of Event</h2>
                        <div className='event-type'>
                            <button type='button' onClick={() => setType('College Rep Visit')} >
                                <h3 className={`regular-font college-size type green ${(type === 'College Rep Visit') ? 'green-background' : ''}`}>College Rep Visit</h3>
                            </button>
                            <button type='button' onClick={() => setType('Informational Meeting')} >
                                <h3 className={`regular-font meeting-size type purple ${(type === 'Informational Meeting') ? 'purple-background' : ''}`}>Informational Meeting</h3>
                            </button>
                        </div>

                    </div>

                    <div className='pickers'>
                        <h2 className='bold-font section-header'>Date & Time</h2>
                        <div className='datepicker'>
                            <select className='semibold-font month-box' value={month} onChange={(e) => setMonth(e.target.value)} >
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>

                            </select>
                            <select className='red regular-font datepicker-box' value={day} onChange={(e) => setDay(e.target.value)} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <input className='red regular-font datepicker-box' placeholder='Year' value={year} onChange={(e) => setYear(e.target.value)}></input>

                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className='calendar-icon'>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg> */}
                        </div>
                        <div>
                            <input className='red semibold-font timepicker time-box' value={time} placeholder='Time' onChange={(e) => setTime(e.target.value)}></input>
                        </div>
                    </div>
                    <button type='submit' className='create-btn'>Edit</button>
                </form >
            </div >
        )
    } else {
        return (
            <div >
                <div className='create-header'>
                    <h1 className='regular-font create-title'>Create Event</h1>
                    <Link to='/counselorHome'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='calendar-page-arrow'>
                            <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
                        </svg>
                    </Link>
                </div>
                <form className='create-event-page' onSubmit={(e) => createEvent(e)}>
                    <div>
                        <h2 className='bold-font section-header'>Title</h2>
                    </div>
                    <div className='login-form-text section-header'>
                        <input className='cred-box' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    <div>
                        <h2 className='bold-font section-header'>Type of Event</h2>
                        <div className='event-type'>
                            <button type='button' onClick={() => setType('College Rep Visit')} >
                                <h3 className={`regular-font college-size type green ${(type === 'College Rep Visit') ? 'green-background' : ''}`}>College Rep Visit</h3>
                            </button>
                            <button type='button' onClick={() => setType('Informational Meeting')} >
                                <h3 className={`regular-font meeting-size type purple ${(type === 'Informational Meeting') ? 'purple-background' : ''}`}>Informational Meeting</h3>
                            </button>
                        </div>

                    </div>

                    <div className='pickers'>
                        <h2 className='bold-font section-header'>Date & Time</h2>
                        <div className='datepicker'>
                            <select className='semibold-font month-box' value={month} onChange={(e) => setMonth(e.target.value)} >
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>

                            </select>
                            <select className='red regular-font datepicker-box' value={day} onChange={(e) => setDay(e.target.value)} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <input className='red regular-font datepicker-box' placeholder='Year' value={year} onChange={(e) => setYear(e.target.value)}></input>

                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className='calendar-icon'>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg> */}
                        </div>
                        <div>
                            <input className='red semibold-font timepicker time-box' value={time} placeholder='Time' onChange={(e) => setTime(e.target.value)}></input>
                        </div>
                    </div>
                    <button type='submit' className='create-btn'>Create</button>
                </form >
            </div >
        )
    }


}


export default CreateEvent