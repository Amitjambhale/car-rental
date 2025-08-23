import React from "react";
import "../../styles/ManageBookings.css";

const ManageBookings = () => {
  const bookings = [
    { id: 1, customer: "Amit", car: "Swift Dzire", date: "2025-08-12" },
    { id: 2, customer: "Ravi", car: "Toyota Innova", date: "2025-08-14" },
  ];

  return (
    <div className="manage-bookings">
      <h2 className="page-title">Manage Bookings</h2>
      <div className="table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Car</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.customer}</td>
                <td>{b.car}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn edit">Edit</button>
                    <button className="btn delete">Delete</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
