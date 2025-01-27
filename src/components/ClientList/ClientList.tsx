import React, { useState } from "react";
import { Client } from "../../types/client";
import { sendMessage } from "../../services/api";
import MessageComponent from "../message/messageComponent";
import styles from "./ClientList.module.css";

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSendReadyMessage = async (client: Client, message: string) => {
    if (!phone) {
      alert("Por favor, ingresa un número de teléfono.");
      return;
    }

    try {
      await sendMessage(phone, message); // Reutilizar la función sendMessage
      alert(`Mensaje enviado exitosamente a ${client.name}`);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Hubo un error al enviar el mensaje.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Clientes</h2>
      <ul className={styles.clientList}>
        {clients.map((client, index) => (
          <li key={index} className={styles.clientItem}>
            <h3 className={styles.clientName}>{client.name}</h3>
            <p className={styles.clientPhone}>Teléfono: {client.phone}</p>
            <h4 className={styles.clientCarsTitle}>Autos:</h4>
            <ul className={styles.carList}>
              {client.vehicle.map((car, carIndex) => (
                <li key={carIndex} className={styles.carItem}>
                  {car.make} {car.model} ({car.year})
                </li>
              ))}
            </ul>
            <div className={styles.messageSection}>
              <input
                type="tel"
                placeholder="Número de teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
              />
              <input
                type="file"
                onChange={handleFileChange}
                className={styles.input}
              />
              <MessageComponent
                defaultMessage={`Hola ${client.name}, su auto ya está listo. Puede venir a retirarlo.`}
                onSend={(message) => handleSendReadyMessage(client, message)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
