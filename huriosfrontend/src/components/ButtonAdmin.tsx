import { useNavigate } from "react-router-dom";

type Props = {
    label?: string; // texto visible del botón
    route?: string; // ruta a la que navega al hacer click
    className?: string; // clases adicionales opcionales
};

// ButtonAdmin: componente simple configurable por props.
// No expone controles de edición en la UI; para cambiar el texto/ruta,
// pásalos como props desde el componente padre.
export function ButtonAdmin({ label = "INVENTARIO", route = "/admin", className = "" }: Props) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (route && route.trim() !== "") {
            navigate(route);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`bg-[var(--Primary_5)] px-4 py-2 rounded-md cursor-pointer hover:bg-[var(--Primary_4)] ${className}`}
        >
            <h2 className="text-white">{label}</h2>
        </button>
    );
}