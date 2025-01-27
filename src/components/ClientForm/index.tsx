import React from "react";
import ClientForm from "./ClientForm";
import styles from "./ClientForm.module.css";

const ClientFormWrapper = ({
  onAddClient,
}: {
  onAddClient: (client: any) => void;
}) => {
  return (
    <div className={styles.formContainer}>
      <ClientForm onAddClient={onAddClient} />
    </div>
  );
};

export default ClientFormWrapper;
