"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import correcto
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); // Redirige al login si no está autenticado
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <h1>Protected Content</h1>;
}
