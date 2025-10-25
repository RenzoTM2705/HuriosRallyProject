import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { EditInput } from "../components/EditInput";
import { ButtonState } from "../components/ButtonState";

export function EditProfile() {
    // valores iniciales de ejemplo; en la app real se obtendrían del backend o del contexto de usuario
    const [user, setUser] = useState({
        name: "Nombre",
        email: "correo@example.com",
        phone: "+51 987 654 321",
    });

    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleSaveAll = async () => {
        // Simular llamada a backend. Reemplaza esto por una petición real cuando tengas la API.
        setSaving(true);
        await new Promise((res) => setTimeout(res, 700));
        setSaving(false);
        // Mostrar estado de éxito brevemente y redirigir
        setClicked(true);
        await new Promise((res) => setTimeout(res, 300));
        navigate("/");
    };

    return (
        <>
            <Navbar />
            <main className="flex flex-col text-center justify-center h-dvh mx-10">
                <div className="border-2 p-10 rounded-lg shadow-lg max-w-md w-full mx-auto border-[var(--Primary_5)]">
                    <div className="flex flex-col items-center gap-6 mb-10">
                        <svg className="w-30 h-30 border-2 border-gray-300 rounded-full p-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-4">
                        <EditInput
                            value={user.name}
                            onSave={(v) => setUser((p) => ({ ...p, name: v }))}
                            placeholder="Nombre completo"
                        />
                        <EditInput
                            value={user.email}
                            onSave={(v) => setUser((p) => ({ ...p, email: v }))}
                            placeholder="Correo electrónico"
                            type="email"
                        />
                        <EditInput
                            value={user.phone}
                            onSave={(v) => setUser((p) => ({ ...p, phone: v }))}
                            placeholder="Celular"
                            type="tel"
                        />
                    </div>
                    <div className="mt-6">
                        <ButtonState
                            initialText={saving ? "Guardando..." : "Guardar cambios"}
                            successText={"Guardado"}
                            disabled={saving}
                            clicked={clicked}
                            onClick={handleSaveAll}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}