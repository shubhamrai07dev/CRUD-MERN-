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
      <div>
        <div className="text-green-200 flex justify-center">
          <Link to={"/add"}>
            <button className="border bg-red-700 rounded-md px-2">
              Add user
            </button>
          </Link>
          <div>
            <table className="border text-center border-spacing-6">
              <thead className="bg-slate-900">
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
                      <td>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="border bg-red-700 rounded-md px-2"
                        >
                          delete
                        </button>
                        <Link
                          to={"/update/" + user._id}
                          className="border bg-green-700 rounded-md px-2"
                        >
                          edit
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
