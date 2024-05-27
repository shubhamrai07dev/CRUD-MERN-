import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast'

function Add() {

    const users = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
            .then((Response) => {
                toast.success(Response.data.message, { position: "top-right" })
                navigate("/")
            })
            .catch(err => console.log(err))
    }
    
    return (
        <>
            <div className='text-white flex justify-center items-center flex-col gap-3'>
                <Link to={'/'}>back</Link>
                <h2 className='font-bold'>Add New user </h2>
                <div>
                    <form onSubmit={submitForm} className=' bg-red-700 p-4 shadow-xl rounded-sm grid gap-3'>
                        <div className="inputGroup">
                            <label htmlFor="fname">First Name</label> <br />
                            <input type="text " onChange={inputHandler} id='fname' name='fname' placeholder='enter first name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="lname">Last Name</label> <br />
                            <input type="text " onChange={inputHandler} id='lname' name='lname' placeholder='enter last name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="email">enter Email</label> <br />
                            <input type="email " onChange={inputHandler} id='email' name='email' placeholder='enter email name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="password">password Name</label> <br />
                            <input type="password " onChange={inputHandler} id='password' name='password' placeholder='enter password  ' />
                        </div>
                        <button className='border bg-red-700 rounded-md px-2'>ADD USER</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Add