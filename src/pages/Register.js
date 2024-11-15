import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Valor por defecto 'customer'
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      role,
    };

    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Hubo un error al registrar el usuario');
      });
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      {message && <p>{message}</p>} {/* Mostrar mensaje de éxito o error */}
      <form onSubmit={handleSubmit}>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <label>Rol:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Cliente</option>
          <option value="employee">Empleado</option>
        </select>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
