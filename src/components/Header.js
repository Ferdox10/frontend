import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const role = localStorage.getItem('role');  // Obtén el rol del usuario desde el almacenamiento local
  const navigate = useNavigate();  // Usamos useNavigate para redirigir al usuario

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    localStorage.removeItem('role');  // Elimina el rol de localStorage
    navigate('/');  // Redirige al inicio
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/products/add">Agregar Producto</Link></li> {/* Visible para todos */}
          <li><Link to="/offers">Ofertas</Link></li>
          <li><Link to="/profile">Perfil de Usuario</Link></li>
          <li><Link to="/register">Registrar</Link></li>
          <li><Link to="/login">Iniciar sesión</Link></li>

          {role && <li><button onClick={handleLogout}>Cerrar sesión</button></li>} {/* Botón de cerrar sesión */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
