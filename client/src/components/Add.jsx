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
                <Link to={'/'} className='border rounded-md mt-5 px-3 py-2  backdrop-filter backdrop-blur-md duration-500 font-bold'>back</Link>
                <h2 className='font-bold underline'>Add New user </h2>
                <div>
                    <form onSubmit={submitForm} className=' border backdrop-blur-md w-[400px] p-6 shadow-xl rounded-md grid gap-3'>
                        <div className="inputGroup">
                            <label htmlFor="fname">First Name</label> <br />
                            <input type="text " onChange={inputHandler} className=' rounded-md p-2 mt-1 bg-transparent border outline-none w-full' id='fname' name='fname' placeholder='enter first name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="lname">Last Name</label> <br />
                            <input type="text " onChange={inputHandler} className='rounded-md p-2 mt-1 bg-transparent border w-full outline-none' id='lname' name='lname' placeholder='enter last name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="email">Email</label> <br />
                            <input type="email " onChange={inputHandler} className=' rounded-md p-2 mt-1 bg-transparent border w-full outline-none' id='email' name='email' placeholder='enter email name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="password">Password </label> <br />
                            <input type="password " onChange={inputHandler} className=' rounded-md p-2 mt-1 bg-transparent border w-full outline-none' id='password' name='password' placeholder='enter password  ' />
                        </div>
                        <button className=' bg-green-400 text-black hover:bg-none hover:text-white font-bold backdrop-blur-md rounded-md p-2'>ADD USER</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Add