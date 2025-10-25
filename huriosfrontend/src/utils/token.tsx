// src/utils/token.tsx
export function saveToken(token: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem("hurios_token", token);
  }
}
export function getToken(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem("hurios_token");
  }
  return null;
}
export function clearToken() {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem("hurios_token");
  }
}
