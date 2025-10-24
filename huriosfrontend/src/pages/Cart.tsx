import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export function Cart() {
    const { 
        items, 
        totalItems, 
        totalPrice, 
        removeFromCart, 
        updateQuantity,
        clearCart
    } = useCart();

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-[var(--Primary_0)]">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="text-center py-16">
                            <svg width={120} height={120} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="mx-auto text-gray-300 mb-6">
                                <circle cx={9} cy={21} r={1}></circle>
                                <circle cx={20} cy={21} r={1}></circle>
                                <path d="m1 1 4 4 14 1-1 7H6"></path>
                            </svg>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">Parece que no has agregado ningún producto a tu carrito aún. Explora nuestros productos y encuentra lo que necesitas.</p>
                            <Link 
                                to="/products" 
                                className="inline-block bg-[var(--Primary_5)] text-white px-8 py-3 rounded-md font-medium hover:bg-[#1e4a6f] transition-colors"
                            >
                                Explorar productos
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--Primary_0)]">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carrito</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <button 
                                onClick={() => window.history.back()}
                                className="text-[var(--Primary_5)] hover:underline"
                            >
                                ← Continuar comprando
                            </button>
                            <span>|</span>
                            <button 
                                onClick={clearCart}
                                className="text-red-600 hover:underline"
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Lista de productos - Columna principal */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Productos en tu carrito ({totalItems})
                                        </h2>
                                        <div className="text-sm text-gray-500">
                                            Precio
                                        </div>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <div key={item.id} className="p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {/* Imagen */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.imageUrl || "/assets/imgs/placeholder.png"}
                                                        alt={item.name}
                                                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-200"
                                                    />
                                                </div>

                                                {/* Información del producto */}
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">
                                                                {item.description || "Sin descripción"}
                                                            </p>
                                                            <p className="text-sm text-green-600 mt-1">
                                                                En stock
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold text-gray-900">
                                                                S/ {Number(item.price).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Controles */}
                                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                                        {/* Cantidad */}
                                                        <div className="flex items-center border border-gray-300 rounded">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                </svg>
                                                            </button>
                                                            <span className="w-12 text-center text-sm font-medium border-x border-gray-300 h-10 flex items-center justify-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                                            >
                                                                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <div className="h-4 w-px bg-gray-300"></div>

                                                        {/* Botones de acción */}
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                                                        >
                                                            Eliminar
                                                        </button>

                                                        <button className="text-sm text-[var(--Primary_5)] hover:text-[#1e4a6f] font-medium">
                                                            Guardar para más tarde
                                                        </button>

                                                        <button className="text-sm text-[var(--Primary_5)] hover:text-[#1e4a6f] font-medium">
                                                            Comparar con artículos similares
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Resumen del pedido - Sidebar derecho */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-4">
                                {/* Subtotal */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-lg">
                                            <span className="font-medium">Subtotal ({totalItems} productos):</span>
                                            <span className="font-bold">S/ {Number(totalPrice).toFixed(2)}</span>
                                        </div>
                                        
                                        {/* Progreso de envío gratis */}
                                        <div className="pt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                                                <div 
                                                    className="bg-green-500 h-1.5 rounded-full transition-all duration-300" 
                                                    style={{ width: `${Math.min((totalPrice / 200) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {totalPrice >= 200 ? (
                                                    <span className="text-green-600 font-medium flex items-center gap-1">
                                                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                            <path d="m9 12 2 2 4-4"></path>
                                                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                                                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                                                            <path d="M3 12h6m6 0h6"></path>
                                                        </svg>
                                                        Tu pedido califica para envío gratis y priorizado
                                                    </span>
                                                ) : (
                                                    <span>
                                                        Agrega <span className="font-semibold">S/ {(200 - totalPrice).toFixed(2)}</span> más para <span className="text-green-600 font-medium">envío gratis y priorizado</span>
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        
                                        <button className="w-full bg-[var(--Primary_5)] text-white py-3 px-4 rounded-md font-medium hover:bg-[#1e4a6f] transition-colors">
                                            Proceder al pago
                                        </button>
                                        
                                        <p className="text-xs text-gray-500 text-center">
                                            El precio y la disponibilidad pueden cambiar. Los impuestos se calculan en el checkout.
                                        </p>
                                    </div>
                                </div>

                                {/* Promoción Envío Gratis */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-green-500 text-white p-2 rounded-lg">
                                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 mb-1">
                                                🚚 Envío Gratis y Priorizado
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Por compras mayores de <span className="font-semibold text-green-700">S/ 200</span>, obtén envío completamente gratis y con prioridad en la entrega.
                                            </p>
                                            <div className="text-xs text-gray-500">
                                                {totalPrice >= 200 ? (
                                                    <span className="text-green-600 font-medium">✓ ¡Felicitaciones! Tu pedido califica para envío gratis y priorizado</span>
                                                ) : (
                                                    <span>Te faltan <span className="font-semibold text-green-700">S/ {(200 - totalPrice).toFixed(2)}</span> para calificar</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
