import React, { useState } from "react";
import styles from "./MessageComponent.module.css";

interface MessageComponentProps {
  defaultMessage: string;
  onSend: (message: string) => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  defaultMessage,
  onSend,
}) => {
  const [message, setMessage] = useState(defaultMessage);

  const handleSend = () => {
    if (!message.trim()) {
      alert("El mensaje no puede estar vacío.");
      return;
    }
    onSend(message);
  };

  return (
    <div className={styles.messageContainer}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.textarea}
        rows={4}
      />
      <button onClick={handleSend} className={styles.button}>
        Enviar mensaje
      </button>
    </div>
  );
};

export default MessageComponent;
