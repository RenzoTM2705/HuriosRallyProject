-- Script para actualizar usuarios existentes sin rol
-- Todos los usuarios registrados antes de la implementación del sistema de roles
-- deben ser asignados como CLIENTE por defecto

USE huriosdb;

-- Actualizar todos los usuarios que no tienen rol (NULL o vacío) a CLIENTE
UPDATE users 
SET role = 'CLIENTE' 
WHERE role IS NULL OR role = '';

-- Verificar la actualización
SELECT email, role, full_name, created_at 
FROM users 
ORDER BY created_at DESC;
