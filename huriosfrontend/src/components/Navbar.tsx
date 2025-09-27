// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

/*
 Navbar.tsx
 - Responsive header with hamburger menu for mobile.
 - Search is highlighted (white background + shadow) so it doesn't blend with navbar.
 - Categories are clickable (dropdown on desktop, <details> on mobile).
 - Comments inline explain behavior.
*/

const categories = [
  { id: 1, name: "Motor" },
  { id: 2, name: "Suspensión" },
  { id: 3, name: "Frenos" },
  { id: 4, name: "Eléctrico" },
  { id: 5, name: "Accesorios" },
];

const Navbar: React.FC = () => {
  // menuOpen controla si el menú móvil está visible
  const [menuOpen, setMenuOpen] = useState(false);
  // catsOpen controla dropdown de categorías en desktop
  const [catsOpen, setCatsOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--Primary_5)] text-white sticky top-0 z-50">
      {/* contenedor principal */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* logo + título */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* logo: colocarlo en public/assets/imgs/logo.webp */}
          <img src="/assets/imgs/logo.webp" alt="Hurios Rally" className="h-8 sm:h-10 w-auto" />
        </Link>

        {/* nav desktop: oculto en lg- (visible en lg+) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/products" className="hover:underline">Productos</Link>

          {/* dropdown categorías (desktop) */}
          <div className="relative">
            {/* botón que abre el dropdown */}
            <button
              onClick={() => setCatsOpen(v => !v)}
              onMouseEnter={() => setCatsOpen(true)}
              onMouseLeave={() => setCatsOpen(false)}
              className="flex items-center gap-1"
              aria-expanded={catsOpen}
            >
              Categorías
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* lista de categorias; pointer-events por defecto permiten clicks */}
            <ul
              onMouseEnter={() => setCatsOpen(true)}
              onMouseLeave={() => setCatsOpen(false)}
              className={`absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-md transform transition-all ${
                catsOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}
              style={{ zIndex: 60 }}
            >
              {categories.map(cat => (
                <li key={cat.id} className="px-4 py-2 hover:bg-gray-100">
                  {/* Link navegable; permite click */}
                  <Link to={`/category/${cat.id}`} className="block">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/about" className="hover:underline">Nosotros</Link>
        </nav>

        {/* acciones (search, cart, login, hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* search: visible en lg+; diseño para destacarlo (fondo blanco) */}
          <div className="hidden lg:block">
            <input
              aria-label="Buscar"
              placeholder="Buscar repuestos..."
              className="px-3 py-2 rounded-md w-48 xl:w-64 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffe08a] transition text-sm"
            />
          </div>

          {/* carrito - siempre visible */}
          <Link to="/cart" className="inline-flex items-center p-1.5 sm:p-2 rounded hover:bg-white/10 flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </Link>

          {/* botón login circular */}
          <Link to="/login" aria-label="Iniciar sesión" className="inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white text-[#27557a] hover:scale-105 transition flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
            </svg>
          </Link>

          {/* hamburger: visible en mobile/tablet */}
          <button
            className="lg:hidden p-1.5 sm:p-2 rounded text-white/90 hover:bg-white/10 flex-shrink-0"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Abrir menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (visible cuando menuOpen=true) */}
      <div className={`lg:hidden bg-[var(--Primary_5)] text-white ${menuOpen ? "block" : "hidden"} px-3 sm:px-4 pb-4`}>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="py-2 border-b border-white/10">Inicio</Link>
          <Link to="/products" className="py-2 border-b border-white/10">Productos</Link>

          {/* details permite expandir categorias y seguir siendo accesible/clickable */}
          <details className="py-2 border-b border-white/10">
            <summary className="cursor-pointer">Categorías</summary>
            <ul className="pl-4 mt-2">
              {categories.map(c => (
                <li key={c.id} className="py-1">
                  <Link to={`/category/${c.id}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </details>

          <Link to="/about" className="py-2 border-b border-white/10">Nosotros</Link>
          <Link to="/user" className="py-2">Usuario</Link>

          {/* mobile search visible en mobile/tablet */}
          <div className="mt-3">
            <input
              aria-label="Buscar"
              placeholder="Buscar..."
              className="px-3 py-2.5 rounded-md w-full bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffe08a] text-sm"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
