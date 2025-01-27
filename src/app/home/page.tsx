"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation"; // Import correcto

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirige al login si no está autenticado
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras carga
  }

  return (
    <div>
      <h1>Bienvenido al Lavadero</h1>
    </div>
  );
};

export default HomePage;
