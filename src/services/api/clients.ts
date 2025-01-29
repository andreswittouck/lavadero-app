import { Client } from "../../types/client";

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchClients = async (): Promise<Client[]> => {
  const response = await fetch(`${apiUrl}/general/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener la lista de clientes");
  }

  return response.json();
};

export const addClient = async (client: Client): Promise<Client> => {
  const response = await fetch(`${apiUrl}/general/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Error al agregar el cliente");
  }

  return response.json();
};

export const updateClient = async (
  id: number,
  client: Partial<Client>
): Promise<Client> => {
  const response = await fetch(`${apiUrl}/general/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el cliente");
  }

  return response.json();
};

export const deleteClient = async (id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/general/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el cliente");
  }
};
