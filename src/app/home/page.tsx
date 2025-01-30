"use client";

import React, { useState, useEffect } from "react";
import UserManager from "../../components/UserManager/UserManager";
import { Client } from "../../types/client";
import styles from "./HomePage.module.css";
import {
  addClient,
  deleteClient,
  fetchClients,
  updateClient,
} from "../../services/api/clients";
import { auth } from "../utils/firebaseConfig";

export default function HomePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    loadClients();
  }, [user]);

  const handleAddClient = async (client: Client) => {
    try {
      const newClient = await addClient(client);
      setClients((prev) => [...prev, newClient]);
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
    }
  };

  const handleUpdateClient = async (id: number, client: Partial<Client>) => {
    try {
      const updatedClient = await updateClient(id, client);
      setClients((prev) =>
        prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
      );
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <UserManager
        clients={clients}
        onAdd={handleAddClient}
        onUpdate={handleUpdateClient}
        onDelete={handleDeleteClient}
      />
    </div>
  );
}
