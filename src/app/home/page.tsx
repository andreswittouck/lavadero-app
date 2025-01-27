"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import ClientFormWrapper from "../../components/ClientForm";
import ClientList from "../../components/ClientList/ClientList";
import useClients from "../../utils/useClients"; // Custom hook para manejo de clientes
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { clients, addClient } = useClients(); // Hook para manejar estado de clientes

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido al Lavadero</h1>
      <ClientFormWrapper onAddClient={addClient} />
      <ClientList clients={clients} />
    </div>
  );
};

export default HomePage;
