import { Vehicle } from "./vehicle";

export interface Client {
  id: number;
  name: string;
  phone: string;
  email?: string;
  vehicle?: Vehicle[];
  createdAt: Date;
}
