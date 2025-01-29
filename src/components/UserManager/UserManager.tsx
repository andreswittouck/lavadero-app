import React, { useState } from "react";
import { Client } from "../../types/client";
import styles from "./UserManager.module.css";

interface UserManagerProps {
  clients: Client[];
  onAdd: (client: Client) => void;
  onUpdate: (id: number, client: Partial<Client>) => void;
  onDelete: (id: number) => void;
}

const UserManager: React.FC<UserManagerProps> = ({
  clients,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formState, setFormState] = useState<Partial<Client>>({
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedClient) {
      onUpdate(selectedClient.id, formState);
    } else {
      onAdd(formState as Client);
    }

    setFormState({ name: "", phone: "", email: "" });
    setSelectedClient(null);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setFormState(client);
  };

  return (
    <div className={styles.userManager}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>{selectedClient ? "Editar Usuario" : "Agregar Usuario"}</h3>
        <label>
          Nombre:
          <input
            type="text"
            value={formState.name || ""}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            value={formState.phone || ""}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, phone: e.target.value }))
            }
            required
          />
        </label>
        <label>
          Email (opcional):
          <input
            type="email"
            value={formState.email || ""}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        <button type="submit">
          {selectedClient ? "Actualizar" : "Agregar"}
        </button>
        {selectedClient && (
          <button
            type="button"
            onClick={() => {
              setSelectedClient(null);
              setFormState({ name: "", phone: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <div className={styles.clientList}>
        {clients.map((client) => (
          <div key={client.id} className={styles.clientCard}>
            <h4>{client.name}</h4>
            <p>Teléfono: {client.phone}</p>
            <button onClick={() => handleEdit(client)}>Editar</button>
            <button onClick={() => client.id && onDelete(client.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
