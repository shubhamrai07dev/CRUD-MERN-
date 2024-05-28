import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Update() {
    const users = {
        fname: "",
        lname: "",
        email: ""
    }

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user)

    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((err) => console.log(err))
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
            .then((Response) => {
                toast.success(Response.data.message, { position: "top-right" })
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className=' flex justify-center items-center flex-col gap-3 text-white'>
                <Link to={'/'} className='border rounded-md mt-5 px-3 py-2  backdrop-filter backdrop-blur-md duration-500 font-bold'>back</Link>
                <h2 className='font-bold underline'>Update user </h2>
                <div>
                    <form onSubmit={submitForm} className='border backdrop-blur-md p-6 w-[400px] shadow-xl rounded-md grid gap-3'>
                        <div className="inputGroup">
                            <label htmlFor="fname">First Name</label> <br />
                            <input type="text " value={user.fname} onChange={inputChangeHandler} className=' rounded-md p-2 mt-1 bg-transparent border outline-none w-full' id='fname' name='fname' placeholder='enter first name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="lname">Last Name</label> <br />
                            <input type="text " value={user.lname} onChange={inputChangeHandler} className=' rounded-md p-2 mt-1 bg-transparent border outline-none w-full'
                            id='lname' name='lname' placeholder='enter last name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="email">enter Email</label> <br />
                            <input type="email " value={user.email} onChange={inputChangeHandler} className=' rounded-md p-2 mt-1 bg-transparent border outline-none w-full' id='email' name='email' placeholder='enter email name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="password">password Name</label> <br />
                            <input type="password "
                                className=' rounded-md p-2 mt-1 bg-transparent border outline-none w-full' id='password' name='password' placeholder='enter password  ' />
                        </div>
                        <button className=' bg-green-400 text-black hover:bg-none hover:text-white font-bold backdrop-blur-md rounded-md p-2'>Update user</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Update;