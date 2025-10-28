# Sistema de Pasarela de Pago - Hurios Rally

## 📋 Resumen

Se ha implementado un sistema completo de pasarela de pago para Hurios Rally con las siguientes características:

### ✅ Funcionalidades Implementadas

1. **Verificación de Sesión**
   - El carrito verifica si el usuario ha iniciado sesión antes de proceder al pago
   - Si no está autenticado, muestra un modal con opción de ir al login
   - Si está autenticado, redirige a la página de checkout

2. **Página de Checkout** (`/checkout`)
   - Formulario de información personal (nombre completo, teléfono)
   - Selección de tipo de comprobante:
     - Boleta (DNI de 8 dígitos)
     - Factura (Nombre de empresa, RUC de 11 dígitos, dirección fiscal)
   - Métodos de entrega:
     - **Retiro en tienda**: Av. 22 de Agosto 1012, Comas 15312 (listo desde el día siguiente)
     - **Entrega a domicilio**: Con campos para dirección, distrito y referencia
   - Resumen de compra con:
     - Subtotal de productos
     - Costo de envío (S/ 10 o GRATIS si el total >= S/ 200)
     - Total final
   - Lista de productos en el pedido
   - Validaciones completas de todos los campos

3. **Página de Pago** (`/payment`)
   - Selección de método de pago:
     - **Tarjeta**: Formulario con validación Luhn, detección automática de tipo (Visa, Mastercard, Amex)
     - **Yape**: Campos para número de celular y código de aprobación
   - Resumen de compra
   - Procesamiento del pago con indicador de carga
   - Modal de éxito al completar el pago
   - Redirección automática al home después del pago exitoso

4. **Backend (API)**
   - Endpoint `POST /payments/process` para procesar pagos
   - Validación de stock disponible antes de procesar
   - Descuento automático de stock después del pago
   - Registro de la venta en tabla `sales`
   - Registro de items en tabla `sale_items`
   - Endpoints adicionales:
     - `GET /payments/my-orders` - Ver órdenes del usuario
     - `GET /payments/all` - Ver todas las órdenes (admin)
     - `GET /payments/{id}` - Ver una orden específica

## 🗄️ Base de Datos

### Tablas Creadas

1. **sales**: Registro de ventas/pedidos
   - Información del comprador (nombre, teléfono)
   - Tipo de comprobante (DNI o factura)
   - Método de entrega (pickup o delivery)
   - Método de pago (card o yape)
   - Montos (subtotal, envío, total)
   - Estado del pedido

2. **sale_items**: Items de cada venta
   - Relación con sale y product
   - Cantidad, precio unitario, subtotal

### Script SQL

Ejecuta el script en `database/create_sales_tables.sql` para crear las tablas necesarias:

```bash
mysql -u tu_usuario -p tu_base_de_datos < database/create_sales_tables.sql
```

## 🚀 Configuración

### Frontend

1. Las nuevas páginas ya están integradas en las rutas:
   - `/checkout` - Página de checkout
   - `/payment` - Página de pago

2. No se requieren dependencias adicionales (todo está implementado con React y validaciones nativas)

### Backend

1. Las entidades JPA se crearán automáticamente si tienes `spring.jpa.hibernate.ddl-auto=update` en tu `application.properties`

2. Alternativamente, ejecuta el script SQL manualmente

## 📱 Flujo de Compra

```
1. Usuario agrega productos al carrito
   ↓
2. Click en "Proceder al pago"
   ↓
3. ¿Usuario autenticado?
   - NO → Modal "Inicia sesión para continuar"
   - SÍ → Continuar
   ↓
4. Formulario de Checkout (/checkout)
   - Información personal
   - Tipo de comprobante
   - Método de entrega
   - Resumen de compra
   ↓
5. Click en "Ir a pagar"
   ↓
6. Selección de método de pago (/payment)
   - Tarjeta o Yape
   - Formulario según método seleccionado
   ↓
7. Click en "Pagar"
   ↓
8. Backend procesa el pago:
   - Valida stock
   - Descuenta stock
   - Crea registro de venta
   - Crea items de venta
   ↓
9. Modal de éxito
   ↓
10. Redirección al home
    - Carrito limpiado
```

## 🔒 Seguridad

- **Autenticación**: Todos los endpoints de pago requieren token JWT válido
- **Validación de Stock**: Se verifica stock disponible antes de procesar
- **Transacciones**: El procesamiento de pago usa `@Transactional` para garantizar consistencia
- **Validación de Datos**: Validaciones en frontend y backend

## 💳 Métodos de Pago

### Tarjeta (Card)
- Validación Luhn del número de tarjeta
- Detección automática de marca (Visa, Mastercard, Amex)
- Formato automático del número de tarjeta
- Validación de fecha de expiración
- Validación de CVC (3-4 dígitos)

### Yape
- Validación de número de celular peruano (9 dígitos)
- Campo para código de aprobación
- Instrucciones claras para el usuario

## 📦 Envío

- **Envío Gratis**: Para compras >= S/ 200 (envío priorizado)
- **Envío Estándar**: S/ 10 para compras < S/ 200 (3-5 días hábiles)
- **Retiro en Tienda**: Gratis, disponible desde el día siguiente

## 🛠️ Archivos Creados

### Frontend
```
src/pages/
  ├── Checkout.tsx          # Página de checkout con formulario
  └── Payment.tsx           # Página de selección y pago

src/pages/Cart.tsx          # Actualizado con verificación de sesión
src/routes/AppRoutes.tsx    # Actualizado con nuevas rutas
```

### Backend
```
entity/
  ├── Sale.java             # Entidad de venta
  └── SaleItem.java         # Entidad de item de venta

repository/
  ├── SaleRepository.java       # Repositorio de ventas
  └── SaleItemRepository.java   # Repositorio de items

service/
  └── PaymentService.java   # Servicio de procesamiento de pagos

controller/
  └── PaymentController.java    # Controlador de endpoints de pago

dto/
  └── PaymentDtos.java      # DTOs para requests/responses de pago
```

### Database
```
database/
  └── create_sales_tables.sql   # Script SQL para crear tablas
```

## 🔄 Próximos Pasos (Opcional)

1. **Integración Real de Pasarela**
   - Integrar con Stripe o PayPal para pagos reales
   - Usar webhooks para confirmación de pagos

2. **Notificaciones**
   - Email de confirmación de compra
   - Notificaciones de cambio de estado del pedido

3. **Panel de Administración**
   - Ver y gestionar órdenes
   - Cambiar estado de pedidos
   - Generar reportes de ventas

4. **Mejoras de UI/UX**
   - Seguimiento de pedido en tiempo real
   - Historial de compras del usuario
   - Facturación electrónica

## 📞 Testing

### Datos de Prueba

**Tarjetas de prueba** (Luhn válidas):
- Visa: 4532 1488 0343 6467
- Mastercard: 5425 2334 3010 9903
- Amex: 3782 822463 10005

**Usuario de prueba**:
- Email: test@example.com
- Teléfono: 987654321
- DNI: 12345678

## ⚠️ Notas Importantes

1. **Stock**: El sistema valida y descuenta automáticamente el stock después de cada compra exitosa
2. **Sesión**: El usuario DEBE estar autenticado para realizar una compra
3. **Datos**: Todos los datos del checkout se guardan en la tabla `sales`
4. **Carrito**: Se limpia automáticamente después de un pago exitoso
5. **Estado**: Las ventas se crean con estado "CONFIRMADO" por defecto

## 🐛 Resolución de Problemas

### Error: "Stock insuficiente"
- Verifica que los productos tengan stock disponible en la base de datos

### Error: "Usuario no autenticado"
- Asegúrate de que el token JWT sea válido y esté en el header Authorization

### La tabla no existe
- Ejecuta el script SQL `create_sales_tables.sql` o verifica tu configuración de Hibernate

### El pago no se procesa
- Revisa los logs del backend para ver errores específicos
- Verifica que todos los campos requeridos estén completos
- Confirma que el usuario tenga productos en el carrito

## ✅ Checklist de Implementación

- [x] Página de Checkout
- [x] Página de Payment con Tarjeta y Yape
- [x] Verificación de sesión en Cart
- [x] Rutas integradas en AppRoutes
- [x] Entidades Sale y SaleItem
- [x] Repositorios de ventas
- [x] Servicio de procesamiento de pagos
- [x] Controlador de pagos
- [x] Script SQL para tablas
- [x] Validación de stock
- [x] Descuento automático de stock
- [x] Cálculo de envío (gratis >= S/200)
- [x] Documentación completa

---

**Desarrollado para Hurios Rally** 🏁
