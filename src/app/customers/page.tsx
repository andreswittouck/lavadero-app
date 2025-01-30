"use client";

import React, { useEffect, useState } from "react";
import styles from "./customers.module.css";
import { Client } from "../../types/client";
import { fetchClients } from "../../services/api/clients";
import ClientList from "../../components/client-list/client-list";

const ClientesPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    loadClients();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Lista de Clientes</h1>
      <ClientList clients={clients} />
    </div>
  );
};

export default ClientesPage;
