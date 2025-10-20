// src/pages/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import ShopCard, { type Product as ProductType } from "../components/ShopCard";


export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setError("Producto no especificado"); setLoading(false); return; }
    (async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar producto");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!product) return <div className="p-8">Producto no encontrado</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">← Volver</button>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img src={product.imageUrl || "/assets/imgs/placeholder.png"} alt={product.name} className="w-full rounded" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold mt-2">S/ {product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-4 text-sm text-gray-500">Stock: {product.stock ?? "—"}</p>
          {/* aquí puedes agregar botón "Agregar al carrito" */}
          <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded">Agregar al carrito</button>
        </div>
      </div>
    </main>
  );
}
