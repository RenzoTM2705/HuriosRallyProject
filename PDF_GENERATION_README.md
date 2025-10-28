# Generación de PDFs - Boletas y Facturas

## Descripción
Se ha implementado la funcionalidad para generar automáticamente PDFs de boletas o facturas después de completar un pago exitoso en el sistema.

## Funcionalidad

### ¿Cómo funciona?

1. **Durante el Checkout**: El usuario selecciona el tipo de comprobante:
   - **Boleta (DNI)**: Para personas naturales con DNI
   - **Factura (RUC)**: Para empresas con RUC

2. **Durante el Pago**: El usuario completa el proceso de pago con tarjeta o Yape

3. **Después del Pago Exitoso**: 
   - Se genera automáticamente un PDF según el tipo de comprobante seleccionado
   - El PDF se descarga automáticamente al navegador del usuario
   - El formato del PDF sigue las estructuras proporcionadas

## Archivos Modificados/Creados

### 1. `src/utils/pdfGenerator.ts` (NUEVO)
Archivo de utilidades que contiene las funciones para generar los PDFs:

- `generateBoletaPDF(data)`: Genera el PDF de la boleta
- `generateFacturaPDF(data)`: Genera el PDF de la factura

### 2. `src/pages/Payment.tsx` (MODIFICADO)
Se agregó la lógica para:
- Importar las funciones de generación de PDF
- Detectar el tipo de documento del checkout
- Preparar los datos necesarios para el PDF
- Llamar a la función correspondiente después del pago exitoso

## Estructura de los PDFs

### Boleta (B001-XXXXX)
Incluye:
- **Encabezado profesional con borde**
- Logo y datos de HURIOS RALLY E.I.R.L.
- Dirección: Av. 22 de Agosto 1012, Comas 15312
- Teléfono: 978 451 154
- RUC: 20492248933 (destacado en cuadro)
- Número de boleta
- Datos del cliente (Nombre, DNI)
- Fecha de emisión
- Método de pago (Tarjeta/Yape)
- Método de entrega (Recojo en tienda / Entrega a domicilio)
- Tabla de productos con fondo alternado para mejor legibilidad
- Totales con cálculo correcto del IGV:
  - O.P. GRAVADA (base imponible sin IGV)
  - TOTAL IGV 18%
  - IMPORTE TOTAL
- **SON en letras**: Conversión automática del total a texto en español
- Pie de página: "Gracias por su preferencia"

### Factura (F001-XXXXX)
Incluye:
- **Encabezado profesional con borde**
- Logo y datos de HURIOS RALLY E.I.R.L.
- Dirección: Av. 22 de Agosto 1012, Comas 15312
- Teléfono: 978 451 154
- RUC: 20492248933 (destacado en cuadro)
- Número de factura
- Datos del cliente (Razón Social, RUC, Dirección Fiscal)
- Fecha de emisión
- Forma de pago (Tarjeta/Yape)
- Método de entrega (Recojo en tienda / Entrega a domicilio)
- Tipo de moneda: SOLES
- Tabla de productos con fondo alternado
- Totales con cálculo correcto del IGV:
  - Sub Total Ventas
  - Anticipos (S/ 0.00)
  - Descuentos (S/ 0.00)
  - Valor venta (base imponible)
  - ISC (S/ 0.00)
  - IGV 18%
  - Importe Total
- **SON en letras**: Conversión automática del total a texto en español
- Pie de página: "Gracias por su preferencia"

## Dependencias

### jsPDF
Biblioteca utilizada para la generación de PDFs en el navegador.

```bash
npm install jspdf
```

## Flujo de Uso

1. Usuario agrega productos al carrito
2. Usuario va a Checkout
3. Usuario selecciona tipo de comprobante:
   - **Boleta**: Ingresa DNI
   - **Factura**: Ingresa RUC, Razón Social y Dirección Fiscal
4. Usuario completa información de entrega (Recojo/Delivery)
5. Usuario va a Payment
6. Usuario selecciona método de pago (Tarjeta/Yape)
7. Usuario hace clic en "Pagar"
8. Sistema procesa el pago
9. **Sistema genera y descarga PDF automáticamente** ✅
10. **Alerta de agradecimiento**: "Gracias por tu compra en Hurios Rally!"
11. Usuario hace clic en "Aceptar" en la alerta
12. Usuario es redirigido a la página principal

## Formato de Numeración

- **Boletas**: B001-00001, B001-00002, etc.
- **Facturas**: F001-00001, F001-00002, etc.

El número se genera usando el `orderId` devuelto por el backend después del pago exitoso.

## Notas Técnicas

- Los PDFs se generan completamente en el lado del cliente (frontend)
- No se requiere configuración adicional en el backend
- Los PDFs siguen el estándar peruano de comprobantes electrónicos
- **Cálculo correcto del IGV**: Se calcula la base imponible (total / 1.18) y luego el IGV (18% de la base)
- Todos los montos se muestran en Soles (S/)
- **Conversión a letras**: El monto total se convierte automáticamente a texto en español (ej: "DOSCIENTOS TREINTA Y NUEVE CON 60/100 SOLES")
- **Diseño profesional**: Bordes, líneas separadoras, fondos alternados en tablas, y tipografía estructurada
- **Información completa**: Incluye dirección, teléfono y método de entrega

## Mejoras Implementadas

✅ **Cálculo correcto del IGV** - Base imponible y IGV 18% calculados correctamente
✅ **SON en letras** - Conversión automática del importe total a texto
✅ **Diseño profesional** - Bordes, líneas, fondos alternados y mejor tipografía
✅ **Método de entrega** - Se incluye en el PDF (Recojo/Delivery)
✅ **Datos de contacto completos** - Dirección y teléfono actualizados
✅ **Alerta de agradecimiento** - Modal nativo antes de redirigir al usuario

## Próximas Mejoras (Opcional)

- [ ] Agregar código QR para validación de comprobantes
- [ ] Agregar logo de la empresa en formato imagen
- [ ] Enviar PDF por correo electrónico
- [ ] Almacenar PDFs en el backend para consulta futura
- [ ] Agregar más estilos y colores corporativos al PDF
