// frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';


function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Obtener los productos destacados
    fetch('http://localhost:5000/api/products/featured')
      .then(response => response.json())
      .then(data => setFeaturedProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h1>Bienvenidos a Maranfer</h1>
      <h2>Productos Destacados</h2>
      <Slider {...settings}>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <img src={`http://localhost:5000/uploads/${product.imageUrl}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Home;
