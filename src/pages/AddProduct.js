import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(''); // Nueva variable para la cantidad
  const [image, setImage] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false); // Nuevo estado para "destacado"
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]); // Estado para mostrar productos existentes

  // Manejo de autenticación
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'empleado' && password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciales inválidas o no tienes permisos');
    }
  };

  // Obtener productos existentes
  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:5000/api/products')
        .then((response) => response.json())
        .then((data) => setProducts(data.products || []))
        .catch((error) => console.error('Error:', error));
    }
  }, [isAuthenticated]);

  // Manejo del envío del formulario de producto
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !price || !quantity || !image) {
      setMessage('Todos los campos son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity); // Enviar cantidad al backend
    formData.append('image', image);
    formData.append('isFeatured', isFeatured);

    fetch('http://localhost:5000/api/products/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.product) {
          setMessage(data.message);
          setProducts((prev) => [...prev, data.product]); // Agregar el nuevo producto al estado
        } else {
          setMessage('Hubo un error al agregar el producto');
        }
      })
      .catch((error) => {
        setMessage('Hubo un error al agregar el producto');
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Autenticación de Empleado</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Usuario:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Ingresar</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Agregar Producto</h1>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <label>Nombre del Producto:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Descripción:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>Precio:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label>Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <label>Imagen:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />

            <label>
              Destacar Producto:
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
            </label>

            <button type="submit">Crear Producto</button>
          </form>

          <h2>Productos Existentes</h2>
          <ul>
            {products && products.length > 0 ? (
              products.map((product) => (
                <li key={product.id}>
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  {product.imageUrl && (
                    <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} style={{ width: '100px' }} />
                  )}
                </li>
              ))
            ) : (
              <p>No hay productos disponibles</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
