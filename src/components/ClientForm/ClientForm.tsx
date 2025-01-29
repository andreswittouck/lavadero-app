import React, { useState } from "react";
import { Client } from "../../types/client";
import styles from "./ClientForm.module.css";

interface ClientFormProps {
  onAddClient: (client: Client) => void;
}

const useCarForm = () => {
  const [cars, setCars] = useState([{ make: "", model: "", year: "" }]);

  const addCar = () => setCars([...cars, { make: "", model: "", year: "" }]);

  const updateCar = (index: number, key: string, value: string) => {
    setCars((prev) =>
      prev.map((car, i) => (i === index ? { ...car, [key]: value } : car))
    );
  };

  return { cars, addCar, updateCar };
};

const ClientForm: React.FC<ClientFormProps> = ({ onAddClient }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { cars, addCar, updateCar } = useCarForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      name,
      phone,
      vehicle: cars.map((car) => ({
        make: car.make,
        model: car.model,
        year: car.year ? parseInt(car.year, 10) : undefined,
      })),
    };
    onAddClient(newClient);
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>
      <h3>Autos:</h3>
      {cars.map((car, index) => (
        <div key={index} className={styles.car}>
          <label>
            Marca:
            <input
              type="text"
              value={car.make}
              onChange={(e) => updateCar(index, "make", e.target.value)}
              required
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              value={car.model}
              onChange={(e) => updateCar(index, "model", e.target.value)}
              required
            />
          </label>
          <label>
            Año:
            <input
              type="number"
              value={car.year}
              onChange={(e) => updateCar(index, "year", e.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addCar}>
        Agregar Auto
      </button>
      <button type="submit">Agregar Cliente</button>
    </form>
  );
};

export default ClientForm;
