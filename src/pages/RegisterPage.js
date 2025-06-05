import React, { useState, useContext } from 'react'
import logo from '../EPHS_CRC.png'
import { Link, Navigate } from 'react-router-dom'
import { IDContext } from '../context/IDContext'

function RegisterPage() {
    const [studentID, setStudentID] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { ID, setID } = useContext(IDContext)

    const register = async (e) => {
        e.preventDefault()

        if (studentID !== '' && (studentID.length === 8 || studentID === 'abbygee') && (!isNaN(Number(studentID)) || studentID === 'abbygee') && password !== '' && repassword !== '' && firstName !== '' && lastName !== '') {
            if (password === repassword) {
                if (studentID === 'abbygee') {
                    const response = await fetch('https://ephscrc-api.onrender.com/users/', {
                        method: 'POST',
                        body: JSON.stringify({ studentID, password, firstName, lastName, 'events': [], role: 'admin' }),
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    })

                    if (response.ok) {
                        response.json().then(userInfo => {
                            setID(studentID)
                            window.sessionStorage.setItem('ID', studentID)
                            setRedirect(true)
                        })
                    } else {
                        alert('Registration failed. You may already have an account. Please try again. If isssue persists, contact support.')
                    }
                } else {
                    const response = await fetch('https://ephscrc-api.onrender.com/users/', {
                        method: 'POST',
                        body: JSON.stringify({ studentID, password, firstName, lastName, 'events': [], role: 'student' }),
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    })

                    if (response.ok) {
                        response.json().then(userInfo => {
                            setID(studentID)
                            window.sessionStorage.setItem('ID', studentID)
                            console.log(`Here is the ID: ${studentID}`)
                            setRedirect(true)
                        })
                    } else {
                        alert('Registration failed. You may already have an account. Please try again. If isssue persists, contact support.')
                    }
                }

            } else {
                alert('Passwords must match')
                setRepassword('')
            }
        } else {
            alert('All fields are required.')
        }

    }

    if (redirect) {
        return (
            <Navigate to='/home' />
        )
    }

    return (
        <form onSubmit={(e) => register(e)} className='login-form'>
            <div>
                <div className='login-form'>
                    <img className='logo' src={logo} alt="EPHS CRC Logo" />
                    <p className='light-font'>Eden Prairie College Resource Center</p>
                </div>
                <h1 className='regular-font login-title'>Register</h1>


                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Enter your student ID...</h3>
                </div>
                <div className='login-form-text'>
                    <input className='cred-box' value={studentID} onChange={(e) => setStudentID(e.target.value)}></input>
                </div>

                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Enter your first and last names...</h3>
                </div>

                <div className='names'>
                    <div className='login-form-text'>
                        <input className='names-box' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    </div>

                    <div className='login-form-text lastname-box-padding'>
                        <input className='names-box' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                </div>

                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Enter your password...</h3>
                </div>
                <div className='login-form-text'>
                    <input className='cred-box' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Re-enter your password...</h3>
                </div>
                <div className='login-form-text'>
                    <input className='cred-box' type='password' value={repassword} onChange={(e) => setRepassword(e.target.value)}></input>
                </div>

            </div>

            <button className='btn' type='submit'>Register</button>
            <Link to='/login' >
                <h3 className='light-font small-size account-link'>Already have an account? <span className='red register-link-padding'>Login here!</span></h3>
            </Link>
        </form>
    )
}

export default RegisterPage