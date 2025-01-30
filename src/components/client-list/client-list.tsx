import React from "react";
import styles from "./client-list.module.css";
import { Client } from "../../types/client";

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  return (
    <div className={styles.clientList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Nombre</th>
            <th className={styles.th}>Teléfono</th>
            <th className={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className={styles.th}>{client.id}</td>
              <td className={styles.th}>{client.name}</td>
              <td className={styles.th}>{client.phone}</td>
              <td className={styles.th}>
                <button className={styles.editBtn}>Editar</button>
                <button className={styles.deleteBtn}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
