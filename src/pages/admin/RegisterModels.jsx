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
        // 🔑 Always read the ACCESS token (not refresh)
        const token = localStorage.getItem("adminToken");  // 👈 must match AdminLogin


        if (!token) {
          setError("⚠️ No admin token found. Please login first.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://192.168.1.46:8000/apis/superadmin/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching users:", err.response?.status, err.response?.data);

        if (err.response?.status === 401) {
          setError("⚠️ Session expired. Please login again.");
          // optional redirect to login page
        } else {
          setError(`Failed to load users: ${err.response?.data?.detail || "Unauthorized"}`);
        }

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
