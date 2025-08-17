import React from "react";

const ManageBookings = () => {
  const bookings = [
    { id: 1, customer: "Amit", car: "Swift Dzire", date: "2025-08-12" },
    { id: 2, customer: "Ravi", car: "Toyota Innova", date: "2025-08-14" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Bookings</h2>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Car</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.customer}</td>
              <td>{b.car}</td>
              <td>{b.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
