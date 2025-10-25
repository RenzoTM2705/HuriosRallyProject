// src/api/user.tsx
import { getToken } from "../utils/token";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export interface UserProfile {
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  const token = getToken();
  if (!token) {
    throw new Error("No hay sesión activa");
  }

  try {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Error al obtener perfil");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("No se puede conectar con el servidor. Verifica que el backend esté corriendo.");
    }
    throw error;
  }
}

export async function updateUserProfile(updates: Partial<UserProfile>): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new Error("No hay sesión activa");
  }

  try {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Error al actualizar perfil");
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("No se puede conectar con el servidor. Verifica que el backend esté corriendo.");
    }
    throw error;
  }
}
