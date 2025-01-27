import { useState, useEffect } from "react";
import { Client } from "../types/client";

const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  // Recuperar clientes almacenados en localStorage al cargar
  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  // Actualizar localStorage cada vez que cambien los clientes
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  // Función para agregar un cliente
  const addClient = (client: Client) => {
    setClients((prev) => [...prev, client]);
  };

  return { clients, addClient };
};

export default useClients;
