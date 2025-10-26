import React from "react";
import Navbar from "../components/Navbar";
import { useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stock?: number;
    // fecha de creación y fecha estimada de llegada
    createdAt?: string;
    expectedArrival?: string | null;
};

export function Inventory() {
    const [activeTab, setActiveTab] = useState("search");
    const [query, setQuery] = useState("");

    // productos en estado local para simular cambios (sin backend por ahora)
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "Producto A", description: "Descripción A", price: 49.9, imageUrl: "/assets/imgs/product-placeholder.png", stock: 12, createdAt: new Date().toISOString(), expectedArrival: null },
        { id: 2, name: "Producto B", description: "Descripción B", price: 79.5, imageUrl: "/assets/imgs/product-placeholder.png", stock: 3, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), expectedArrival: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString() },
        { id: 3, name: "Producto C", description: "Descripción C", price: 29.0, imageUrl: "/assets/imgs/product-placeholder.png", stock: 0, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), expectedArrival: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString() },
    ]);

    const [showAddStockFor, setShowAddStockFor] = useState<number | null>(null);
    const [addQuantity, setAddQuantity] = useState<number>(0);

    // form for creating a new product
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newStock, setNewStock] = useState("");
    // preview URL for uploaded image
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    
    // calendario: mes visible y fecha seleccionada
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const d = new Date();
        d.setDate(1);
        return d;
    });
    const [selectedDate, setSelectedDate] = useState<string | null>(null); 
    const navigate = useNavigate();

    // utilidades para el calendario
    const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const daysInMonth = (d: Date) => endOfMonth(d).getDate();

    const productsByArrivalDate: Record<string, Product[]> = {};
    products.forEach(p => {
        if (p.expectedArrival) {
            const iso = new Date(p.expectedArrival).toISOString().slice(0, 10);
            if (!productsByArrivalDate[iso]) productsByArrivalDate[iso] = [];
            productsByArrivalDate[iso].push(p);
        }
    });

    const arrivalsForVisibleMonth = (() => {
        const y = visibleMonth.getFullYear();
        const m = visibleMonth.getMonth();
        const days: { date: string; products: Product[] }[] = [];
        const dim = daysInMonth(visibleMonth);
        for (let day = 1; day <= dim; day++) {
            const iso = new Date(y, m, day).toISOString().slice(0, 10);
            days.push({ date: iso, products: productsByArrivalDate[iso] || [] });
        }
        return days;
    })();

    const newestArrivals = [...products].sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
    }).slice(0, 6);
    
    const goPrevMonth = () => {
        setVisibleMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
    const goNextMonth = () => {
        setVisibleMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const openAddStock = (id: number) => {
        setShowAddStockFor(id);
        setAddQuantity(0);
    };

    const confirmAddStock = () => {
        if (showAddStockFor == null) return;
        const qty = Number(addQuantity || 0);
        if (Number.isNaN(qty) || qty <= 0) return;
        setProducts(prev => prev.map(p => p.id === showAddStockFor ? { ...p, stock: (Number(p.stock || 0) + qty) } : p));
        setShowAddStockFor(null);
        setAddQuantity(0);
    };

    const handleFile = (f?: File) => {
        if (!f) return;
        const url = URL.createObjectURL(f);
        setPreview(url);
    };

    const handleCreateProduct = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        // validar campos mínimos
        if (!newName.trim() || !newPrice) return;
        const p = {
            id: Date.now(),
            name: newName,
            description: newDesc,
            price: Number(newPrice),
            imageUrl: preview || "/assets/imgs/product-placeholder.png",
            stock: Number(newStock) || 0,
        };
    setProducts(prev => [p, ...prev]);
    // limpiar form
    setNewName(""); setNewPrice(""); setNewDesc(""); setNewStock(""); setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
        // cambiar a pestaña de búsqueda para ver el producto añadido
        setActiveTab("search");
    };

    return (
        <>
            <Navbar />

            <main className="p-4 sm:p-6 max-w-5xl mx-auto">
                <section className="bg-white/90 border border-white/20 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate('/admin-profile')} className="px-2 py-1 border rounded text-sm">Regresar</button>
                            <h1 className="text-2xl font-semibold">Inventario</h1>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setActiveTab("search")}
                            className={`px-3 py-1 rounded-md text-sm ${activeTab === "search" ? "bg-[var(--Primary_3)] text-white" : "bg-transparent border border-[var(--Primary_3)] text-[var(--Primary_3)]"}`}>
                            Búsqueda de artículos
                        </button>
                        <button
                            onClick={() => setActiveTab("add")}
                            className={`px-3 py-1 rounded-md text-sm ${activeTab === "add" ? "bg-[var(--Primary_3)] text-white" : "bg-transparent border border-gray-200 text-gray-700"}`}>
                            Añadir stock / Producto
                        </button>
                        <button
                            onClick={() => setActiveTab("supply")}
                            className={`px-3 py-1 rounded-md text-sm ${activeTab === "supply" ? "bg-[var(--Primary_3)] text-white" : "bg-transparent border border-gray-200 text-gray-700"}`}>
                            Provisión de compras
                        </button>
                    </div>

                    {/* Search bar */}
                    {activeTab === "search" && (
                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Buscar..."
                                    className="w-full px-3 py-2 border rounded-md outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Add product form */}
                    {activeTab === "add" && (
                        <form onSubmit={handleCreateProduct} className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Precio (S/)</label>
                                <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" step="0.01" className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium mb-1">Descripción</label>
                                <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full px-3 py-2 border rounded-md" rows={3} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Stock inicial</label>
                                <input value={newStock} onChange={(e) => setNewStock(e.target.value)} type="number" className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Foto del producto</label>
                                <input ref={fileRef} onChange={(e) => { if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]); }} type="file" accept="image/*" className="w-full" />
                                {preview && <img src={preview} alt="preview" className="mt-2 h-28 object-contain" />}
                            </div>
                            <div className="sm:col-span-2">
                                <div className="flex gap-2">
                                    <button type="submit" className="px-4 py-2 bg-[var(--Primary_5)] text-white rounded-md">Crear producto</button>
                                    <button type="button" onClick={() => { setNewName(""); setNewPrice(""); setNewDesc(""); setNewStock(""); setPreview(null); if (fileRef.current) fileRef.current.value = ""; }} className="px-4 py-2 border rounded-md">Limpiar</button>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Product grid/list (mostrar en todas las pestañas excepto 'supply') */}
                    {activeTab !== "supply" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filtered.map((p) => (
                                <div key={p.id} className="relative">
                                    <ProductCard product={{ id: p.id, name: p.name, description: p.description, price: p.price, imageUrl: p.imageUrl, stock: p.stock }} />
                                    {/* botón para añadir stock (abre modal) */}
                                    <div className="mt-2 flex gap-2">
                                        <button onClick={() => openAddStock(p.id)} className="flex-1 px-3 py-2 bg-[var(--Primary_5)] text-white rounded-md">Agregar stock</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* calendario y nuevas llegadas */}
                    {activeTab === "supply" && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl font-semibold">Calendario de provisiones</h2>
                                <div className="flex items-center gap-2">
                                    <button onClick={goPrevMonth} className="px-2 py-1 border rounded">◀</button>
                                    <div className="px-3 py-1 bg-gray-50 rounded">{visibleMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                                    <button onClick={goNextMonth} className="px-2 py-1 border rounded">▶</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(w => (
                                    <div key={w} className="font-medium text-gray-600 py-1">{w}</div>
                                ))}
                                {/** build leading empty cells to align first day */}
                                {(() => {
                                    const firstWeekday = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay();
                                    const cells: React.ReactNode[] = [];
                                    for (let i = 0; i < firstWeekday; i++) cells.push(<div key={`e-${i}`} />);
                                    arrivalsForVisibleMonth.forEach(d => {
                                        const dayNum = Number(d.date.slice(-2));
                                        const has = d.products.length > 0;
                                        cells.push(
                                            <div key={d.date} className={`p-2 border rounded ${selectedDate === d.date ? 'bg-[var(--Primary_3)] text-white' : ''}`} onClick={() => setSelectedDate(d.date)}>
                                                <div className="text-sm">{dayNum}</div>
                                                {has && <div className="text-xs mt-1 bg-[var(--Primary_5)] text-white rounded-full w-6 h-6 mx-auto flex items-center justify-center">{d.products.length}</div>}
                                            </div>
                                        );
                                    });
                                    return cells;
                                })()}
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2">Productos previstos {selectedDate ? `para ${selectedDate}` : '(selecciona una fecha)'}</h3>
                                    <div className="space-y-3">
                                        {(selectedDate && productsByArrivalDate[selectedDate] ? productsByArrivalDate[selectedDate] : []).map(p => (
                                            <div key={p.id} className="flex items-center gap-3 border rounded p-2">
                                                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-contain" />
                                                <div>
                                                    <div className="font-medium">{p.name}</div>
                                                    <div className="text-sm text-gray-600">S/ {Number(p.price).toFixed(2)}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {!selectedDate && <div className="text-sm text-gray-500">Selecciona una fecha del calendario para ver los productos.</div>}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Nuevas llegadas</h3>
                                    <div className="space-y-2">
                                        {newestArrivals.map(p => (
                                            <div key={p.id} className="flex items-center gap-3 border rounded p-2">
                                                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-contain" />
                                                <div className="flex-1">
                                                    <div className="font-medium">{p.name}</div>
                                                    <div className="text-xs text-gray-500">Creado: {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'}</div>
                                                </div>
                                                <div className="text-sm font-semibold">S/ {Number(p.price).toFixed(2)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* modal para añadir stock (simulado) */}
                    {showAddStockFor != null && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white rounded-md p-6 w-full max-w-md">
                                <h3 className="text-lg font-semibold mb-2">Agregar stock</h3>
                                <p className="text-sm text-gray-600 mb-4">Producto: {products.find(p => p.id === showAddStockFor)?.name}</p>
                                <input type="number" value={addQuantity} onChange={(e) => setAddQuantity(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md mb-4" placeholder="Cantidad a agregar" />
                                <div className="flex gap-2 justify-end">
                                    <button className="px-4 py-2 border rounded-md" onClick={() => { setShowAddStockFor(null); setAddQuantity(0); }}>Cancelar</button>
                                    <button className="px-4 py-2 bg-[var(--Primary_5)] text-white rounded-md" onClick={confirmAddStock}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}