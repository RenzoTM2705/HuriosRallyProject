// src/components/ProductCard.tsx
import React from "react";

/*
 ProductCard.tsx
 - Card simple reutilizable para mostrar producto con imagen, titulo y precio.
 - Recibe props; tiene valores por defecto para desarrollo.
*/

type Props = {
  title?: string;
  price?: string;
  img?: string;
};

const ProductCard: React.FC<Props> = ({ title = "Producto ejemplo", price = "S/00.00", img = "/assets/imgs/logo1.webp" }) => {
  return (
    <article className="bg-white rounded-lg shadow p-3">
      {/* imagen */}
      <div className="h-36 rounded overflow-hidden mb-3">
        <img src={"/assets/imgs/filtros_de_aire_universal.webp"} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* texto */}
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-3">Descripción breve del producto.</p>

      {/* footer card con precio y acciones */}
      <div className="flex items-center justify-between">
        <span className="font-bold">{price}</span>
        <div className="flex items-center gap-3 text-gray-500">
          <button aria-label="Agregar al carrito" className="p-1 hover:cursor-pointer hover:shadow-xs hover:bg-gray-100 hover:scale-105 transition flex-shrink-0">
            <svg width={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#223150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </button>
          <button aria-label="Ver detalles" className="p-1 hover:cursor-pointer hover:shadow-xs hover:bg-gray-100 hover:scale-105 transition flex-shrink-0">
            <svg width={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#0C1424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard
