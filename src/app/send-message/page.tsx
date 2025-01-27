import React, { useState } from "react";
import { sendMessage } from "../../services/api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const SendMessagePage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      await sendMessage(phoneNumber, message);
      setStatus("Mensaje enviado con éxito.");
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="container">
      <h1>Enviar Mensaje</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Número de Teléfono"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="5493584117248"
        />
        <Input
          label="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="¡Tu auto está listo para retirar!"
        />
        <Button label="Enviar" type="submit" onClick={() => {}} />
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendMessagePage;
