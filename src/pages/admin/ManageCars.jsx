import React, { useState } from "react";

const ManageCars = () => {
  const [cars, setCars] = useState([
    { id: 1, name: "Swift Dzire", rent: 1500 },
    { id: 2, name: "Toyota Innova", rent: 2500 },
  ]);

  const handleDelete = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Cars</h2>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>₹{car.rent}</td>
              <td>
                <button onClick={() => alert("Edit feature here")}>Edit</button>
                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCars;
