import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/RegisterModels.css";

const RegisterModels = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching users...");
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        console.log("Token:", token);
        if (!token) {
          setError("⚠️ No admin token found. Please login first.");
          setLoading(false);
          window.location.href = "/admin-login"; // Redirect to login
          return;
        }

        const res = await axios.get("http://10.181.222.14:8000/apis/superadmin/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", res.data);

        // Extract the 'results' array from the paginated response
        const userData = res.data.results || [];

        // Validate that userData is an array
        if (!Array.isArray(userData)) {
          throw new Error("API response 'results' is not an array");
        }

        // Transform data to match expected field names
        const transformedUsers = userData.map(user => ({
          id: user.id || user.user_id || null, // Use a unique ID if available
          Name: user.name || user.Name || "N/A",
          Email: user.email || user.Email || "N/A",
          Mobile_no: user.mobile_no || user.Mobile_no || "N/A",
          Date_Of_Birth: user.date_of_birth || user.Date_Of_Birth || null,
        }));

        setUsers(transformedUsers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        if (err.response?.status === 401) {
          setError("⚠️ Session expired. Please login again.");
          window.location.href = "/admin-login"; // Redirect to login
        } else {
          setError(`Failed to load users: ${err.message || "Unknown error"}`);
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
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u.id || u.Email || index}>
                  <td>{index + 1}</td>
                  <td>{u.Name}</td>
                  <td>{u.Email}</td>
                  <td>{u.Mobile_no}</td>
                  <td>
                    {u.Date_Of_Birth
                      ? new Date(u.Date_Of_Birth).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }) || "Invalid Date"
                      : "N/A"}
                  </td>
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