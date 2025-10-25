-- Script para crear usuario administrador
-- Email: robinrotten0210@gmail.com
-- Password: 72032575Dasa (será hasheada por BCrypt en la app)

-- Nota: Ejecuta este comando en tu aplicación Java o usa BCrypt para generar el hash
-- Por ahora, usaremos un script temporal en Java para generar el hash

-- Para ejecutar manualmente desde MySQL:
-- 1. Primero, detén el backend
-- 2. Crea el usuario con un hash temporal
-- 3. Reinicia el backend y usa el endpoint de reset de contraseña para establecer la contraseña real

-- Alternativa: Ejecutar este INSERT después de generar el hash con BCrypt
-- BCrypt hash de "72032575Dasa": $2a$10$... (se genera automáticamente)

-- Por seguridad, usaremos un endpoint especial para crear el admin
