import { useEffect, useState } from 'react';
import { Product } from './products/productTypes';
import { getProducts } from './products/productService';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered =
    category === 'all'
      ? products
      : products.filter(p => p.category === category);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  return (
    <div className="container">
      <div className="topbar">
        <h1>Catálogo de Productos</h1>
        <div className="cart">Carrito: {cart.length}</div>
      </div>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div className="products">
        {filtered.map(p => (
          <div className="product" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.price}</p>
            <p>{p.category}</p>
            <button onClick={() => addToCart(p.id)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;