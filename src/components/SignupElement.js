import React, { useEffect, useState, useContext } from 'react';
import SignupDateIcon from './SignupDateIcon';
import { IDContext } from '../context/IDContext';
import { useNavigate } from 'react-router-dom'


const SignupElement = (props) => {
    const month = props.month
    const day = props.day
    const rep = props.rep
    const title = props.title
    const time = props.time
    const eventID = props.ID
    const attendees = props.attendees
    const showSignUp = props.show ?? true
    const { ID, setID } = useContext(IDContext)
    const [signedUpAttendees, setSignedUpAttendees] = useState([])
    const navigate = useNavigate();

    const signUpEvent = async (e) => {
        e.preventDefault()
        console.log(eventID)
        setSignedUpAttendees([...attendees].push(ID))
        const response = await fetch('https://ephscrc-api.onrender.com/events/signUp', {
            method: 'PATCH',
            body: JSON.stringify({ title, id: eventID, 'attendee': ID }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (response.ok) {
            alert("Successfully signed up!")
            window.location.reload();
        }
    }

    const unsignUpEvent = async (e) => {
        e.preventDefault()
        console.log(eventID)
        setSignedUpAttendees([...attendees].splice(attendees.indexOf(ID), 1))
        const response = await fetch('https://ephscrc-api.onrender.com/events/removeMe', {
            method: 'PATCH',
            body: JSON.stringify({ title, id: eventID, 'attendee': ID }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if (response.ok) {
            alert("Successfully removed you!")
            navigate('/home')
        }
    }

    return (
        <div>
            <div className='signup-element'>
                <div className='signup-main'>
                    <SignupDateIcon month={month} day={day} />
                    <h3 className='regular-font big-size'>{title}</h3>
                </div>
                <div className='signup-details'>
                    {(showSignUp) && (
                        <button onClick={(e) => signUpEvent(e)} className='signup-button regular-font'>Sign Up!</button>
                    )}
                    {(!showSignUp) && (
                        <button onClick={(e) => unsignUpEvent(e)} className='signup-button regular-font'>Remove Me!</button>
                    )}
                    <h3 className={`regular-font ${rep ? 'rep-visit' : 'info-meeting'} ${rep ? 'green' : 'purple'} padding-right`}>{rep ? 'College Rep Visit' : 'Informational Meeting'}</h3>
                    <h3 className='regular-font time red'>{time}</h3>
                </div>
            </div>
            <hr className='divider' />
        </div>
    )
}

export default SignupElement