// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandsCarousel from "../components/BrandsCarousel";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
};

const Home: React.FC = () => {
  useReveal();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/products`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nuevos = products.slice(0, 4);
  const masVendidos = products.slice(4, 8);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* nuevos repuestos */}
        <section
          data-reveal
          className="max-w-7xl mx-auto px-4 py-10 opacity-0 transform translate-y-6"
        >
          <h2 className="text-2xl font-bold mb-4">Nuevos repuestos</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {nuevos.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* marcas (slider) */}
        <BrandsCarousel />

        {/* más vendidos */}
        <section
          data-reveal
          className="max-w-7xl mx-auto px-4 py-10 opacity-0 transform translate-y-6"
        >
          <h2 className="text-2xl font-bold mb-4">Los más vendidos</h2>
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {masVendidos.length > 0
                ? masVendidos.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))
                : nuevos.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
