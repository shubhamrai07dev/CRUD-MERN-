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
            <div className=' flex justify-center items-center flex-col gap-3'>
                <Link to={'/'}>back</Link>
                <h2 className='font-bold'>Update user </h2>
                <div>
                    <form onSubmit={submitForm} className=' bg-red-700 p-4 shadow-xl rounded-sm grid gap-3'>
                        <div className="inputGroup">
                            <label htmlFor="fname">First Name</label> <br />
                            <input type="text " value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' placeholder='enter first name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="lname">Last Name</label> <br />
                            <input type="text " value={user.lname} onChange={inputChangeHandler} id='lname' name='lname' placeholder='enter last name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="email">enter Email</label> <br />
                            <input type="email " value={user.email} onChange={inputChangeHandler} id='email' name='email' placeholder='enter email name ' />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="password">password Name</label> <br />
                            <input type="password " id='password' name='password' placeholder='enter password  ' />
                        </div>
                        <button className='border bg-red-700 rounded-md px-2'>Update user</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Update;