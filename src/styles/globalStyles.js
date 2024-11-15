import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Estilos globales */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #FFFEFEFF;
  }

  h1, h2, h3 {
    color: #ff00ff; /* Color rosado */
  }

  a {
    text-decoration: none;
    color: #ff00ff; /* Color rosado */
  }

  /* Estilo del Header */
  .header {
    padding: 1rem;
    background-color: #0E0D0DFF;
    border-bottom: 1px solid #ccc;
  }

  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .nav-link {
    color: #ff00ff;
    font-weight: bold;
  }

  .nav-link:hover {
    color: #0056b3;
  }

  /* Estilo del Footer */
  .footer {
    padding: 1rem;
    background-color: #141414FF;
    margin-top: 1rem;
  }

  .footer p {
    text-align: center;
    color: #ff00ff;
  }

  /* Botón 3D */
  .button-3d {
    background-color: #ff69b4; /* Rosado fuerte */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s;
  }

  .button-3d:hover {
    transform: translateY(-2px);
  }

  .register-container, .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ff69b4;
    border-radius: 8px;
    background-color: #EB35FC46;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input, select {
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #ff69b4;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: #ff00ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

  /* Estilo para las imágenes */
  img {
    max-width: 100%; /* Asegura que las imágenes no excedan el tamaño de su contenedor */
    height: auto; /* Mantiene las proporciones de la imagen */
    display: block; /* Elimina el espacio en blanco debajo de las imágenes */
    margin: 0 auto; /* Centra las imágenes dentro de su contenedor */
  }
`;

export default GlobalStyle;
