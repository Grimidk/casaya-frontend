import React, { createContext, useState } from 'react';
import axios from 'axios';



 // Crear el contexto POST  
 export const UserContext = createContext()
 // Proveedor del contexto
 export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null); // Estado para almacenar la información del usuari
   // Función para iniciar sesión
   const login = async (email, password) => {
     try {
      console.log('Enviando credenciales:', { email, password });
       const response = await axios.post('https://casaya-back-backup-production.up.railway.app/users/login', {
         email,
         password,
       })
       console.log('Respuesta del backend:', response.data);
       if (response.data) {
         setUser(response.data); // Guardar los datos del usuario en el estado
         return true; // Credenciales correctas
       } else {
         return false; // Credenciales incorrectas
       }
     } catch (error) {
       console.error('Error al iniciar sesión:', error.response?.data || error.message);
       return false; // Error en la petición
     }
   }
   // Función para cerrar sesión
   const logout = () => {
     setUser(null); // Limpiar los datos del usuario
   }
   return (
     <UserContext.Provider value={{ user, login, logout }}>
       {children}
     </UserContext.Provider>
   );
 };