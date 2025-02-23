import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario

  // Función para iniciar sesión
  const login = (username, password) => {
    if (username === 'mauricio' && password === '1234') { //Conectar con el back
      setUser({ name: username }); // Guardar los datos del usuario
      return true; // Credenciales correctas
    } else {
      return false; // Credenciales incorrectas
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Limpiar los datos del usuario
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};