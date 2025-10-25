-- Agregar campos de perfil a la tabla users
-- Ejecutar este script si la tabla users ya existe sin estos campos

ALTER TABLE users
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS address TEXT;
