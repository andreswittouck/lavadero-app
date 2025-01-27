import React, { useState } from "react";
import { Client } from "../../types/client";

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSendReadyMessage = async (client: Client) => {
    if (!phone) {
      alert("Por favor, ingresa un número de teléfono.");
      return;
    }

    const payload = {
      service: "whatsapp",
      phoneNumber: phone,
      message: `Hola ${client.name}, su auto ya está listo. Puede venir a retirarlo.`,
    };

    if (file) {
      try {
        const base64String = await convertFileToBase64(file);
        // payload["base64File"] = base64String; // Agregar archivo en base64 al payload
      } catch (error) {
        console.error("Error al convertir el archivo a base64:", error);
        alert("No se pudo adjuntar el archivo.");
        return;
      }
    }

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      alert(`Mensaje enviado exitosamente a ${client.name}`);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Hubo un error al enviar el mensaje.");
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (result) {
          resolve(result.split(",")[1]); // Obtener la parte base64
        } else {
          reject(new Error("Error al leer el archivo."));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clients.map((client, index) => (
          <li key={index}>
            <h3>{client.name}</h3>
            <p>Teléfono: {client.phone}</p>
            <h4>Autos:</h4>
            <ul>
              {client.vehicle.map((car, carIndex) => (
                <li key={carIndex}>
                  {car.make} {car.model} ({car.year})
                </li>
              ))}
            </ul>
            <div>
              <input
                type="tel"
                placeholder="Número de teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input type="file" onChange={handleFileChange} />
              <button onClick={() => handleSendReadyMessage(client)}>
                Enviar mensaje
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
