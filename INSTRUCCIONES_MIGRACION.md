# Solución al Error de Subida de Imagen de Perfil

## Problema Identificado
El endpoint `/user/profile-image` no existía en el backend y la tabla `users` no tenía la columna `profile_image`.

## Cambios Realizados

### 1. Backend (Java/Spring Boot)
- ✅ Agregado campo `profileImage` a la entidad `User.java`
- ✅ Agregado endpoint `POST /user/profile-image` en `UserController.java`
- ✅ Actualizado método `getProfile` para incluir `profileImage`
- ✅ Creado script de migración SQL

### 2. Base de Datos
Se creó el archivo de migración en:
`huriosbackend/src/main/resources/db/migration/add_profile_image.sql`

## Pasos para Aplicar la Solución

### Opción 1: Ejecutar el script SQL manualmente

1. Conectarse a tu base de datos MySQL:
   ```bash
   mysql -u tu_usuario -p nombre_base_datos
   ```

2. Ejecutar el siguiente comando SQL:
   ```sql
   ALTER TABLE users ADD COLUMN profile_image VARCHAR(255);
   ```

### Opción 2: Dejar que JPA actualice automáticamente

Si tienes configurado `spring.jpa.hibernate.ddl-auto=update` en tu `application.properties`, 
simplemente reinicia el backend y Hibernate creará la columna automáticamente.

### 3. Reiniciar el Backend

Después de aplicar la migración, reinicia tu aplicación Spring Boot:

```bash
cd huriosbackend
./mvnw spring-boot:run
```

O si usas Maven directamente:
```bash
mvn spring-boot:run
```

## Verificación

Una vez reiniciado el backend, intenta subir una imagen de perfil desde el frontend. 
El error debería estar resuelto y la imagen debería guardarse en la carpeta `uploads/profiles/`.

## Estructura de Directorios Creados

El backend creará automáticamente estas carpetas al subir la primera imagen:
```
huriosbackend/
  uploads/
    profiles/     <- Imágenes de perfil de usuarios
    products/     <- Imágenes de productos (ya existente)
```

## Validaciones Implementadas

El endpoint implementado valida:
- ✅ Token JWT válido
- ✅ Archivo no vacío
- ✅ Tipo de archivo (solo imágenes)
- ✅ Tamaño máximo: 5MB
- ✅ Generación de nombres únicos (UUID)
- ✅ Actualización automática en la base de datos
