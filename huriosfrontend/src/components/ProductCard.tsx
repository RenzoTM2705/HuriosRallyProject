// src/components/ProductCard.tsx
import React from "react";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock?: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img
        src={product.imageUrl || "/assets/imgs/placeholder.png"}
        alt={product.name}
        className="w-full h-40 object-cover mb-3"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-bold">S/ {product.price.toFixed(2)}</p>
      {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
        <p className="text-sm text-orange-600 font-medium mt-1">¡Solo quedan {product.stock}!</p>
      )}
      {product.stock !== undefined && product.stock === 0 && (
        <p className="text-sm text-red-600 font-medium mt-1">Agotado</p>
      )}
    </div>
  );
};

export default ProductCard;
