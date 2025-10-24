// src/components/ShopCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/**
 * Tipo/Interfaz pública del producto.
 * Exportamos esto para que otras páginas puedan importar el shape del producto.
 */
export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  stock?: number;
};

/**
 * ShopCard: componente que muestra la información principal de un producto.
 * - exportamos el componente como 'ShopCard' (named export) y además como default export
 *   para que puedas importarlo de la forma que prefieras.
 */
export const ShopCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, isOpen, toggleCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    // Abrir el sidebar del carrito después de agregar
    if (!isOpen) {
      toggleCart();
    }
  };

  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col transition-transform hover:scale-105">
      {/* Imagen (placeholder si no hay) */}
      <div className="aspect-[4/3] w-full mb-3 overflow-hidden rounded cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
        <img
          src={product.imageUrl || "/assets/imgs/placeholder.png"}
          alt={product.name}
          className="object-cover h-full w-full transition-transform hover:scale-110"
        />
      </div>

      {/* Título y descripción */}
      <h3 className="text-lg font-semibold mb-1 cursor-pointer hover:text-[var(--Primary_5)]" onClick={() => navigate(`/products/${product.id}`)}>{product.name}</h3>
      <p className="text-sm text-gray-600 flex-1">{product.description || "Sin descripción"}</p>

      {/* Precio */}
      <div className="text-xl font-bold text-[var(--Primary_5)] mb-3">S/ {Number(product.price).toFixed(2)}</div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          className="w-full px-4 py-2 bg-[var(--Primary_5)] text-white rounded-md font-medium hover:bg-[#1e4a6f] transition-colors flex items-center justify-center gap-2"
          aria-label={`Añadir ${product.name} al carrito`}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx={9} cy={21} r={1}></circle>
            <circle cx={20} cy={21} r={1}></circle>
            <path d="m1 1 4 4 14 1-1 7H6"></path>
          </svg>
          Añadir al carrito
        </button>
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="w-full px-4 py-2 border border-[var(--Primary_5)] text-[var(--Primary_5)] rounded-md font-medium hover:bg-[var(--Primary_5)] hover:text-white transition-colors"
          aria-label={`Ver detalles de ${product.name}`}
        >
          Ver detalles
        </button>
      </div>
    </article>
  );
};

// export por defecto por compatibilidad
export default ShopCard;
