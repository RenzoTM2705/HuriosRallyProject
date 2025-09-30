// src/api/products.ts
// Funciones para consumir endpoints de productos del backend.
// Usa import.meta.env.VITE_API_URL si lo configuraste; si no usa http://localhost:8080
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Obtener todos los productos.
 * devuelve: Promise<Product[]>
 */
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Error cargando productos");
  return await res.json();
}

/**
 * Obtener un producto por id
 * devuelve: Promise<Product>
 */
export async function getProductById(id: string | number) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Producto no encontrado");
  return await res.json();
}
