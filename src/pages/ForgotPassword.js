import { React, useState } from 'react'
import logo from '../EPHS_CRC.png'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const ForgotPassword = () => {
    const [studentID, setStudentID] = useState('')
    const [password, setPassword] = useState('')
    const { id } = useParams();


    const reset = async (e) => {
        if (studentID !== '' && studentID.length === 8 && !isNaN(Number(studentID))) {
            const response = await fetch('https://ephscrc-api.onrender.com/users', {
                method: 'PATCH',
                body: JSON.stringify({ id: `${id}`, password: `${password}` }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }).then(() => {
                alert("Password successfully reset. You may now login. If not, please try again or contact EPHS CRC if issue persists.")
            })

        } else {
            alert("Please enter a valid student ID")
        }
    }

    return (
        <form onSubmit={(e) => reset(e)} className='login-form'>
            <div>
                <div className='login-form'>
                    <img className='logo' src={logo} alt="EPHS CRC Logo" />
                    <p className='light-font'>Eden Prairie College Resource Center</p>
                </div>
                <h1 className='regular-font login-title'>Reset Password</h1>


                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Enter your student ID...</h3>
                </div>
                <div className='login-form-text'>
                    <input className='cred-box' value={studentID} onChange={(e) => setStudentID(e.target.value)}></input>
                </div>

                <div className='login-form-text'>
                    <h3 className='light-font small-size red'>Enter your new password...</h3>
                </div>
                <div className='login-form-text'>
                    <input className='cred-box' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
            </div>

            <button className='btn' type='submit'>Reset</button>
            <Link to='/login' >
                <h3 className='light-font small-size account-link'>Remember it now? <span className='red register-link-padding'>Login here!</span></h3>
            </Link>
        </form>
    )
}

export default ForgotPassword