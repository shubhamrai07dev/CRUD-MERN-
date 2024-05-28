import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function GetUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  // deleter user

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="text-white" >
        <div className="flex flex-col items-center justify-center">
          <Link to={"/add"}>
            <button className="border rounded-md m-5 px-3 py-2  backdrop-filter backdrop-blur-md duration-500 font-bold">
              Add user
            </button>
          </Link>
          <div>
            <table className="border rounded-md border-separate backdrop-blur-md text-center border-spacing-9">
              <thead className="bg-0">
                <tr>
                  <th>Sr No.</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>
                        {user.fname} {user.lname}
                      </td>
                      <td>{user.email}</td>
                      <td className="grid space-x-2 grid-cols-2">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="border border-red-300 rounded-md px-2 hover:text-red-500 font-bold"
                        >
                          Delete
                        </button>
                        <Link
                          to={"/update/" + user._id}
                          className="border border-green-300 rounded-md px-2 hover:text-green-500 font-bold"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetUser;
