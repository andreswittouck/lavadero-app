import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Función para agregar un vehículo
export const addVehicle = async (vehicleData: {
  ownerId: string;
  plate: string;
  model: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "vehicles"), vehicleData);
    console.log("Vehicle added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding vehicle:", error);
  }
};
