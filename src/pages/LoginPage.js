import React, { useState, useContext, useEffect } from 'react'
import logo from '../EPHS_CRC.png'
import { Link, Navigate } from 'react-router-dom'
import { IDContext } from '../context/IDContext'

function LoginPage() {
    const [studentID, setStudentID] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [userID, setUserID] = useState('')
    const { ID, setID } = useContext(IDContext)


    const login = async (e) => {
        e.preventDefault()

        if (studentID !== '' || password !== '') {
            const response = await fetch('https://ephscrc-api.onrender.com/auth/', {
                method: 'POST',
                body: JSON.stringify({ studentID, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (response.ok) {
                response.json().then(userInfo => {
                    setID(studentID)
                    window.sessionStorage.setItem('ID', studentID)
                    console.log(studentID)
                    setRedirect(true)
                })
            } else {
                alert('Login failed. Please try again. If isssue persists, contact support.')
            }

        } else {
            alert('All fields are required.')
        }
    }

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

    const forgotPassword = async (e) => {
        e.preventDefault()

        if (studentID !== '' && studentID.length === 8 && !isNaN(Number(studentID))) {
            allUsers.map(user => {
                if (user.studentID === studentID) {
                    setUserID(user._id)
                }
            })
            if (userID !== '') {
                var sendemail = studentID + "@ep-student.org"
                var sendtext = `Hello! You requested a password reset! You may reset it at http://localhost:3000/forgotPassword/${userID}. If this wasn't you, please report this incident to the EPHS CRC to prevent future security concerns.`
                const response = await fetch('https://ephscrc-api.onrender.com/users/email', {
                    method: 'POST',
                    body: JSON.stringify({ sendEmail: `${sendemail}`, subject: "Forgot Password", text: `${sendtext}` }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                }).then(() => {
                    console.log('Success')
                    alert("Please check your student email for a reset link! If you didn't get one, you may not have an account yet.")
                })
            }
        } else {
            alert('Please enter a valid student ID')
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    if (redirect) {
        return (
            <Navigate to='/home' />
        )
    }

    if (ID !== '') {
        return (
            <Navigate to='/home' />
        )
    }

    if (ID === 'abbygee') {
        return (
            <Navigate to='/counselorHome' />
        )
    }

    return (
        <form onSubmit={(e) => login(e)} className='login-form'>
            <div>
                <div className='login-form'>
                    <img className='logo' src={logo} alt="EPHS CRC Logo" />
                    <p className='light-font'>Eden Prairie College Resource Center</p>
                </div>
                <h1 className='regular-font login-title'>Login</h1>


                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Enter your student ID...</h3>
                </div>
                <div className='login-form-text'>
                    <input className='cred-box' value={studentID} onChange={(e) => setStudentID(e.target.value)}></input>
                </div>

                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Enter your password...</h3>
                </div>
                <div className='login-form-text'>
                    <input className='cred-box' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <h3 className='light-font small-size register-link'>Forgot Password? <span onClick={(e) => forgotPassword(e).then(alert("Please check your student email for a reset link! If you didn't get one, you may not have an account yet, or please try again."))} className='red register-link-padding'>Click here!</span></h3>
            </div>

            <button className='btn' type='submit'>Login</button>
            <Link to='/register' >
                <h3 className='light-font small-size account-link'>Don't have an account? <span className='red register-link-padding'>Register here!</span></h3>
            </Link>
        </form>
    )
}

export default LoginPage