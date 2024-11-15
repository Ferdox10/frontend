import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente de ruta privada para empleados
function PrivateRoute({ children }) {
  const role = localStorage.getItem('role'); // Obtén el rol del usuario desde el almacenamiento local

  if (role !== 'employee') {
    // Si el rol no es empleado, redirige al inicio
    return <Navigate to="/" />;
  }

  return children; // Si el usuario es un empleado, renderiza la página solicitada
}

export default PrivateRoute;
