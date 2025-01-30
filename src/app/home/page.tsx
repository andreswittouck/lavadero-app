"use client";

import React, { useState, useEffect } from "react";
import ClientList from "../../components/client-list/client-list";
import VehicleList from "../../components/VehicleList/VehicleList";
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) return <p>Loading...</p>;

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
