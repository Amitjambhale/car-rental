// src/utils/storage.js
import initialCars from "../data/cars";

const storageKey = "malhar_cars_v1";

export const loadCarsFromStorage = () => {
  const raw = localStorage.getItem(storageKey);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(storageKey, JSON.stringify(initialCars));
  return initialCars;
};

export const saveCarsToStorage = (cars) => {
  localStorage.setItem(storageKey, JSON.stringify(cars));
};
