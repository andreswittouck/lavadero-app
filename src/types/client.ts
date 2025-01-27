import { Vehicle } from "./vehicle";

export interface Client {
  name: string; // Nombre del cliente
  phone: string; // Número de teléfono
  vehicle: Vehicle[]; // Lista de autos asociados al cliente
}
