// src/components/ProductCard.tsx
import React from "react";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
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
    </div>
  );
};

export default ProductCard;
