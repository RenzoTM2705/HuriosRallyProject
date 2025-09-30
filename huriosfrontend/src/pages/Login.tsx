// src/pages/Login.tsx
import { Input } from "../components/Input";
import { ButtonState } from "../components/ButtonState";
import { useState } from "react";
import { loginUser } from "../api/auth";
import { saveToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isFormValid) return;
    setClicked(true);
    try {
      const res = await loginUser({ email: correo, password: clave });
      // res: { token, email }
      saveToken(res.token);
      // redirigir a home
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setClicked(false);
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const isPasswordMatch = clave.length >= 8;
  const isFormValid = isEmailValid && isPasswordMatch;

  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-gradient-to-br from-[var(--Primary_0)] via-[var(--Primary_1)] to-[var(--Primary_2)] flex flex-col justify-center items-center relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[var(--Primary_3)] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--Primary_4)] rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--Primary_2)] rounded-full opacity-10 blur-2xl"></div>
      </div>

      {/* Contenedor principal del formulario */}
      <div className="relative z-10 w-full max-w-md mx-8 sm:mx-6 md:mx-4">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10">
          {/* Header con logo */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src="/assets/imgs/logo.webp" 
                className="h-20 w-auto mx-auto drop-shadow-lg" 
                alt="Hurios Rally Logo" 
              />
            </div>
            <h1 className="text-2xl font-bold text-[var(--Primary_7)] mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-[var(--Primary_5)] text-sm">
              Inicia sesión en tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input 
                label="Correo electrónico" 
                type="email" 
                placeholder="ejemplo@gmail.com" 
                onChange={(e) => setCorreo(e.target.value)} 
              />
              <Input 
                label="Contraseña" 
                type="password" 
                placeholder="********" 
                onChange={(e) => setClave(e.target.value)} 
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Botón principal */}
            <div className="space-y-4">
              <ButtonState 
                initialText="Iniciar sesión" 
                successText="¡Ingreso exitoso!" 
                disabled={!isFormValid} 
                clicked={clicked} 
              />
              
              {/* Enlace de registro */}
              <a 
                href="/register" 
                className="block w-full text-center bg-gradient-to-r from-[var(--Primary_4)] to-[var(--Primary_5)] text-white py-3 rounded-lg hover:from-[var(--Primary_5)] hover:to-[var(--Primary_6)] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Crear cuenta nueva
              </a>
            </div>

            {/* Enlace de recuperación */}
            <div className="text-center">
              <a 
                href="/reset-password" 
                className="text-[var(--Primary_5)] hover:text-[var(--Primary_6)] text-sm font-medium transition-colors duration-200 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>

        {/* Footer decorativo */}
        <div className="text-center mt-8">
          <p className="text-[var(--Primary_5)] text-sm">
            Repuestos y accesorios de calidad
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
