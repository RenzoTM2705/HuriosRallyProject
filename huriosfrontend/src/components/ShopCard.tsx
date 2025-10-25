// src/components/ShopCard.tsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
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

  const [showDetails, setShowDetails] = useState<boolean>(false);

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
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setShowDetails(true);
          }}
          className="w-full px-4 py-2 border border-[var(--Primary_5)] text-[var(--Primary_5)] rounded-md font-medium hover:bg-[var(--Primary_5)] hover:text-white transition-colors"
          aria-label={`Ver detalles de ${product.name}`}
        >
          Ver detalles
        </button>
      </div>
      {showDetails && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full mx-4 overflow-hidden shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
              <button
              onClick={() => setShowDetails(false)}
              aria-label="Cerrar detalles"
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 p-2 rounded-full bg-white/60 hover:bg-white"
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
              <div className="md:flex md:gap-6 items-start">
                <div className="md:w-2/5 w-full flex items-center justify-center bg-gray-50 p-4">
                  <img
                    src={product.imageUrl || "/assets/imgs/placeholder.png"}
                    alt={product.name}
                    className="w-full h-auto max-h-[36rem] object-contain"
                  />
                </div>
                <div className="md:w-3/5 w-full p-6 flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold mb-1">{product.name}</h2>
                  <div className="text-2xl font-bold text-[var(--Primary_5)] mb-2">S/ {Number(product.price).toFixed(2)}</div>
                  <p className="text-base text-gray-700 mb-2">{product.description || 'Sin descripción'}</p>
                  <div className="mt-auto">
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleAddToCart(e);
                        setShowDetails(false);
                      }}
                      className="w-full px-6 py-3 bg-[var(--Primary_5)] text-white rounded-md font-medium hover:bg-[#1e4a6f] transition-colors text-lg"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>,
        document.body
      )}
    </article>
  );
};

// export por defecto por compatibilidad
export default ShopCard;
