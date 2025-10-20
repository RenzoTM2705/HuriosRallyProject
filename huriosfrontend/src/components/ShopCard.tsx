// src/components/ShopCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col">
      {/* Imagen (placeholder si no hay) */}
      <div className="aspect-[4/3] w-full mb-3 overflow-hidden rounded">
        <img
          src={product.imageUrl || "/assets/imgs/placeholder.png"}
          alt={product.name}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Título y descripción */}
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-sm text-gray-600 flex-1">{product.description || "Sin descripción"}</p>

      {/* Precio y acción */}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xl font-bold">S/ {Number(product.price).toFixed(2)}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
            aria-label={`Ver ${product.name}`}
          >
            Ver
          </button>
        </div>
      </div>
    </article>
  );
};

// export por defecto por compatibilidad
export default ShopCard;
