import React from "react";
import { Client } from "../../types/client";
import styles from "./ClientList.module.css";

interface ClientListProps {
  clients: Client[];
  onSelectClient?: (client: Client) => void; // Callback opcional al seleccionar un cliente
}

const ClientList: React.FC<ClientListProps> = ({ clients, onSelectClient }) => {
  return (
    <div className={styles.clientList}>
      {clients.map((client) => (
        <div
          key={client.id}
          className={styles.clientCard}
          onClick={() => onSelectClient?.(client)}
        >
          <h4>{client.name}</h4>
          <p>Teléfono: {client.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
