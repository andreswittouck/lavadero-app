"use client";

import { signOut } from "firebase/auth";
import { auth } from "../../app/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <h1>Mi Lavadero</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/customers">Clientes</Link>
        </li>
        <li>
          <Link href="/contact">Contacto</Link>
        </li>
      </ul>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
