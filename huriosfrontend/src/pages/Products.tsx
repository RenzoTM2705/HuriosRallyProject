// src/pages/Products.tsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ShopCard, { type Product } from "../components/ShopCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


/*
 Página Products:
 - carga lista desde backend
 - muestra spinner / mensaje de error si aplica
 - muestra grid responsivo de ShopCard
*/
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // cargar productos al montar
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-8">Productos</h1>
          
          {loading ? (
            <div className="text-center py-8">Cargando productos...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => <ShopCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
