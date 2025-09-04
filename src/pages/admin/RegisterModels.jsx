import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/RegisterModels.css";

const RegisterModels = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ✅ Token get from localStorage
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("⚠️ No admin token found. Please login first.");
          setLoading(false);
          return;
        }



        const res = await axios.get("http://192.168.1.46:8000/apis/superadmin/users/", {
  headers: {
    Authorization: `Bearer ${token}`, // ✅ Correct token now
  },
});



        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
        setError("Failed to load users. Unauthorized.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="register-models">
      <h2 className="header">Registered Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u.Email || index}>   {/* agar Email unique hai to use karo */}
                  <td>{u.Name}</td>
                  <td>{u.Email}</td>
                  <td>{u.Mobile_no}</td>
                  <td>{new Date(u.Date_Of_Birth).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default RegisterModels;
