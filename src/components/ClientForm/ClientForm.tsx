import React, { useState } from "react";
import { Client } from "../../types/client";

interface ClientFormProps {
  onAddClient: (client: Client) => void; // Define el tipo para la función onAddClient
}

const ClientForm: React.FC<ClientFormProps> = ({ onAddClient }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cars, setCars] = useState([{ make: "", model: "", year: undefined }]);

  const handleAddCar = () => {
    setCars([...cars, { make: "", model: "", year: undefined }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crear un objeto Client
    const newClient: Client = {
      name,
      phone: phone,
      vehicle: cars.map((car, index) => ({
        make: car.make,
        model: car.model,
        year: car.year, // Año del auto
      })),
    };

    onAddClient(newClient); // Llama a la función para agregar el cliente
    setName("");
    setPhone("");
    setCars([{ make: "", model: "", year: undefined }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <h3>Autos</h3>
      {cars.map((car, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Marca"
            value={car.make}
            onChange={(e) =>
              setCars(
                cars.map((c, i) =>
                  i === index ? { ...c, make: e.target.value } : c
                )
              )
            }
            required
          />
          <input
            type="text"
            placeholder="Modelo"
            value={car.model}
            onChange={(e) =>
              setCars(
                cars.map((c, i) =>
                  i === index ? { ...c, model: e.target.value } : c
                )
              )
            }
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddCar}>
        Agregar otro auto
      </button>
      <button type="submit">Agregar Cliente</button>
    </form>
  );
};

export default ClientForm;
