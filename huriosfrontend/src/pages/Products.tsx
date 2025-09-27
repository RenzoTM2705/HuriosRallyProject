import { useState, useEffect } from "react";
import { ButtonNormal } from "../components/ButtonNormal";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";


export function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleSearch = () => setIsSearchOpen(prev => !prev);
    const closeSearch = () => setIsSearchOpen(false);

    // Cerrar búsqueda con tecla Escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeSearch();
            }
        };

        if (isSearchOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSearchOpen]);
    
    return (
        <>
        <Navbar />
        <main className="relative ">
            
            {/* Modal del filtro de productos */}
            {isModalOpen && (
                <div 
                    className="text-white fixed inset-0 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div 
                        className="bg-[var(--Primary_4)] flex flex-col p-10 rounded-lg w-80 max-w-sm mx-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-bold mb-6">Filtrar productos</h2>
                        <div className="flex flex-row justify-between items-center gap-2 mb-4">
                            <span>Marca</span>
                            <select className="bg-white text-gray-800 px-2 py-1 rounded">
                                <option>Marca 1</option>
                                <option>Marca 2</option>
                                <option>Marca 3</option>
                            </select>
                        </div>
                        <div className="flex flex-row justify-between items-center gap-2 mb-6">
                            <span>Precio</span>
                            <select className="bg-white text-gray-800 px-2 py-1 rounded">
                                <option>menor a S/.100</option>
                                <option>S/.100 a S/.500</option>
                                <option>mayor a S/.500</option>
                            </select>
                        </div>
                        <ButtonNormal defaultText="Aplicar filtros"/>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between gap-2 p-4">
                    <h1 className="text-[20px] font-bold">Productos</h1>
                    <div className="flex items-center gap-2">
                    {/* Barra de búsqueda expandible*/}
                    {isSearchOpen && (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        console.log("Buscando:", searchTerm);
                                        // Aquí iría la lógica de búsqueda
                                    }
                                }}
                                placeholder="Buscar productos..."
                                className="w-48 px-2 py-1 bg-transparent border-0 border-b-2 border-gray-400 focus:border-[var(--Primary_5)] focus:outline-none text-gray-800 text-sm placeholder-gray-500"
                                autoFocus
                            />
                        </div>
                    )}
                    
                    <button className="hover:cursor-pointer" onClick={toggleSearch} aria-label="Buscar">
                        <svg width={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#0C1424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                    <button className="hover:cursor-pointer"  onClick={openModal} aria-label="Filtrar productos">
                        <svg width={24} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 3H16V1H0V3Z" fill="#0C1424"></path> <path d="M2 7H14V5H2V7Z" fill="#0C1424"></path> <path d="M4 11H12V9H4V11Z" fill="#0C1424"></path> <path d="M10 15H6V13H10V15Z" fill="#0C1424"></path> </g></svg>
                    </button>
                </div>
            </div>
            <div className="flex gap-7 px-4 pb-4 overflow-x-auto">
                <a href="#" className="text-xs font-bold border-2 p-1 rounded-lg">Categoría</a>
                <a href="#" className="text-xs font-bold border-2 p-1 rounded-lg">Categoría</a>
                <a href="#" className="text-xs font-bold border-2 p-1 rounded-lg">Categoría</a>
                <a href="#" className="text-xs font-bold border-2 p-1 rounded-lg">Categoría</a>
                <a href="#" className="text-xs font-bold border-2 p-1 rounded-lg">Categoría</a>
                <a href="#" className="text-xs font-bold border-2 p-1 rounded-lg">Categoría</a>
            </div>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center px-4 pb-20">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </section>
            </div>
        </main>
        <Footer/>
        </>
    );
}