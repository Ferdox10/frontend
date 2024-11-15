import React, { useState } from 'react';
import axios from 'axios';  // Asegúrate de tener axios instalado

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      // Realizamos la solicitud POST a la API de login
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);

      // Verificamos si la respuesta contiene un token
      if (response.data.token) {
        // Guardamos el token y el rol en el localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); // Guardar el rol del usuario

        setMessage('Inicio de sesión exitoso');
        
        // Redirige al usuario a la página de inicio después de iniciar sesión
        window.location.href = '/';  // Redirigir al inicio o a otra página según tu necesidad
      } else {
        // Si no hay token, mostramos el mensaje de error
        setMessage(response.data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Hubo un error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      {message && <p>{message}</p>} {/* Mostrar mensaje de éxito o error */}
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
