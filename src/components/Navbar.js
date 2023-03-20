import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserEmail(currentUser.email);
      } else {
        setUserEmail('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-brand']}>
        {userEmail && <span>Hola, {userEmail}!</span>}
      </div>
      <div className={styles['navbar-menu']}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/register">Registrarse</Link>
        {userEmail && <button onClick={handleSignOut}>Cerrar sesión</button>}
      </div>
    </nav>
  );
};

export default Navbar;
