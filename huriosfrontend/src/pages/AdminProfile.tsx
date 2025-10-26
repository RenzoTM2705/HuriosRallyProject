import Navbar from "../components/Navbar";
import { ButtonAdmin } from "../components/ButtonAdmin";
export function AdminProfile() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--Primary_0)] py-8">
                <div className="max-w-4xl mx-auto px-4">

                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Avatar predeterminado SVG */}
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--Primary_4)] to-[var(--Primary_5)] flex items-center justify-center shadow-lg">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">

                                    </h1>
                                    <p className="text-gray-600"></p>
                                </div>
                            </div>
                            <button
                                className="px-4 py-2 bg-[var(--Primary_5)] text-white rounded-md hover:bg-[#1e4a6f] transition-colors flex items-center gap-2"
                            >
                                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Editar perfil
                            </button>
                        </div>
                    </div>

                    <section className="flex gap-4 mb-6 flex-wrap justify-between">
                        <ButtonAdmin label="INVENTARIO" route="/inventario" />
                        <ButtonAdmin label="BOLETAS/FACTURAS" route="/boletas-facturas" />
                        <ButtonAdmin label="PROVEEDORES" route="/proveedores" />
                    </section>


                    {/* Formulario */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Información personal</h2>

                        {/* Email (solo lectura) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">El correo no se puede modificar</p>
                        </div>

                        {/* Nombre completo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre completo
                            </label>
                            <input
                                type="text"

                                placeholder="Ingresa tu nombre completo"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--Primary_5)] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Teléfono
                            </label>
                            <input
                                type="tel"

                                placeholder="Ingresa tu número de teléfono"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--Primary_5)] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                            />
                        </div>

                        {/* Dirección */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dirección
                            </label>
                            <textarea

                                placeholder="Ingresa tu dirección"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--Primary_5)] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-[var(--Primary_5)] text-white rounded-md hover:bg-[#1e4a6f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                            </button>
                            <button
                                type="button"

                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancelar
                            </button>
                        </div>
                        </div>
                    </div>
            </main>
        </>
    );
}