"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css"; // Importamos el CSS Module

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [monsterImg, setMonsterImg] = useState("/monster/idle/1.png");
  const [seguirMouse, setSeguirMouse] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!seguirMouse) return;
      const { clientX, clientY } = e;
      const anchoMitad = window.innerWidth / 2;
      const altoMitad = window.innerHeight / 2;

      if (clientX < anchoMitad && clientY < altoMitad) {
        setMonsterImg("/monster/idle/2.png");
      } else if (clientX < anchoMitad && clientY > altoMitad) {
        setMonsterImg("/monster/idle/3.png");
      } else if (clientX > anchoMitad && clientY < altoMitad) {
        setMonsterImg("/monster/idle/5.png");
      } else {
        setMonsterImg("/monster/idle/4.png");
      }
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    return () =>
      document.body.removeEventListener("mousemove", handleMouseMove);
  }, [seguirMouse]);

  useEffect(() => {
    const handleEmailChange = () => {
      const length = email.length;
      if (length <= 5) {
        setMonsterImg("/monster/read/1.png");
      } else if (length <= 14) {
        setMonsterImg("/monster/read/2.png");
      } else if (length <= 20) {
        setMonsterImg("/monster/read/3.png");
      } else {
        setMonsterImg("/monster/read/4.png");
      }
    };

    handleEmailChange();
  }, [email]);

  useEffect(() => {
    if (isPasswordFocused) {
      setSeguirMouse(false);
      let cont = 1;
      const cubrirOjo = setInterval(() => {
        setMonsterImg(`/monster/cover/${cont}.png`);
        if (cont < 8) {
          cont++;
        } else {
          clearInterval(cubrirOjo);
        }
      }, 60);

      return () => clearInterval(cubrirOjo);
    } else {
      let cont = 7;
      const descubrirOjo = setInterval(() => {
        setMonsterImg(`/monster/cover/${cont}.png`);
        if (cont > 1) {
          cont--;
        } else {
          clearInterval(descubrirOjo);
          setSeguirMouse(true);
        }
      }, 60);

      return () => clearInterval(descubrirOjo);
    }
  }, [isPasswordFocused]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <Image
          src={monsterImg}
          alt="Monster"
          width={150}
          height={150}
          className={styles.monster}
        />

        <form className={styles.formulario} onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="tuemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setSeguirMouse(false)}
            onBlur={() => setSeguirMouse(true)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)} // Activa la animación
            onBlur={() => setIsPasswordFocused(false)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className={styles.register}>
          {error && <p className={styles.error}>{error}</p>}
          <p>
            ¿No tienes cuenta? <Link href="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
