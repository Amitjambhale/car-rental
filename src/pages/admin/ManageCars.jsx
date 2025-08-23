import React, { useState, useEffect } from "react";
import carsData from "../../data/cars";

const ManageCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("cars")) || [];
    setCars([...carsData, ...savedCars]);
  }, []);

  const handleAddCar = (newCar) => {
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);

    // save only custom cars to localStorage
    const customCars = updatedCars.filter((c) => c.custom); 
    localStorage.setItem("cars", JSON.stringify(customCars));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Cars</h2>

      {/* Add Car Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newCar = {
            id: Date.now(),
            name: formData.get("name"),
            rent: formData.get("rent"),
            fuelType: formData.get("fuelType"),
            transmission: formData.get("transmission"),
            seats: formData.get("seats"),
            image: URL.createObjectURL(formData.get("image")), // temporary image path
            custom: true,
          };
          handleAddCar(newCar);
          e.target.reset();
        }}
      >
        <input type="text" name="name" placeholder="Car Name" required />
        <input type="number" name="rent" placeholder="Rent" required />
        <input type="text" name="fuelType" placeholder="Fuel Type" required />
        <input type="text" name="transmission" placeholder="Transmission" required />
        <input type="number" name="seats" placeholder="Seats" required />
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">Add Car</button>
      </form>

      {/* Cars Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Rent</th>
            <th>Fuel</th>
            <th>Transmission</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>
                <img src={car.image} alt={car.name} width="80" />
              </td>
              <td>{car.name}</td>
              <td>{car.rent}</td>
              <td>{car.fuelType}</td>
              <td>{car.transmission}</td>
              <td>{car.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCars;
