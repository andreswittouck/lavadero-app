export const sendMessage = async (
  phoneNumber: string,
  message: string
): Promise<void> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const response = await fetch(`${apiUrl}/general/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service: "whatsapp",
      phoneNumber,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al enviar el mensaje");
  }
};
