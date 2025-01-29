import React from "react";
import { Vehicle } from "../../types/vehicle";
import styles from "./VehicleList.module.css";

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  return (
    <div className={styles.vehicleList}>
      {vehicles.map((vehicle, index) => (
        <div key={index} className={styles.vehicleCard}>
          <p>
            <strong>Marca:</strong> {vehicle.make}
          </p>
          <p>
            <strong>Modelo:</strong> {vehicle.model}
          </p>
          <p>
            <strong>Año:</strong> {vehicle.year || "Desconocido"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
