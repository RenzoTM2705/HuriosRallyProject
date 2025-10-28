# ⚙️ Sistema Web de Gestión de Pedidos y Clientes - Hurios Rally

----------
## 📖 Descripción del proyecto  
Sistema web para **Hurios Rally E.I.R.L.**, tienda de repuestos automotrices.  
💡 Objetivo: digitalizar pedidos, productos y atención al cliente, mejorando gestión y rapidez.

---------


## 🛠️ Pila de tecnología

### 🎨 Frontend  
- ⚛️ **React**: librería para construir interfaces de usuario interactivas.  
- 🟦 **TypeScript**: JavaScript tipado que mejora la robustez del código.  
- 🎯 **Tailwind CSS**: framework de estilos para diseño rápido y responsivo.

### 🔧 Backend  
- 🌱 **Spring Boot**: framework para crear aplicaciones Java de forma ágil.  
- 🛡️ **Spring Security**: manejo de autenticación y autorización.  
- 🌐 **Spring Web**: soporte para servicios REST y controladores web.  
- 🔑 **JWT (JSON Web Token)**: autenticación segura mediante tokens.  
- 🧩 **Hash256**: encriptación de contraseñas para mayor seguridad.

### 🗂️ Base de datos  
- 🐬 **MySQL**: sistema de gestión de bases de datos relacional, confiable y escalable.

# Guía de Pruebas Unitarias - Hurios Rally Project

## 📚 Conceptos Clave

### 1. **JUnit 5**
Framework estándar para pruebas unitarias en Java. Permite:
- Escribir y ejecutar pruebas automatizadas
- Verificar que el código funciona como se espera
- Organizar pruebas con anotaciones como `@Test`, `@BeforeEach`, `@DisplayName`

### 2. **Mockito**
Framework para crear **mocks** (objetos simulados). Útil para:
- Simular dependencias (bases de datos, APIs, servicios externos)
- Aislar la clase que estás probando
- Controlar el comportamiento de las dependencias en tus pruebas

### 3. **TDD (Test-Driven Development)**
Metodología de desarrollo donde:
1. **RED**: Escribes la prueba primero (falla porque no existe el código)
2. **GREEN**: Escribes el código mínimo para que la prueba pase
3. **REFACTOR**: Mejoras el código manteniendo las pruebas pasando

## 🔧 Configuración

Las dependencias ya están en tu `pom.xml`:

```xml
<!-- JUnit 5 y Mockito vienen incluidos en spring-boot-starter-test -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<!-- Mockito adicional -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <scope>test</scope>
</dependency>
```

## 🚀 Ejecutar las Pruebas

### Opción 1: Ejecutar todas las pruebas
```bash
mvn test
```

### Opción 2: Ejecutar una clase específica
```bash
mvn test -Dtest=PaymentServiceTest
mvn test -Dtest=ValidationServiceTest
```

### Opción 3: Ejecutar un método específico
```bash
mvn test -Dtest=PaymentServiceTest#testProcessPayment_Success
```

### Opción 4: Con más detalles
```bash
mvn test -X
```

### Opción 5: Usando tu IDE
- **IntelliJ IDEA**: Click derecho en la clase de prueba → "Run Tests"
- **Eclipse**: Click derecho → "Run As" → "JUnit Test"
- **VS Code**: Instala extensión "Java Test Runner"

  ###Pruebas TDD

https://github.com/user-attachments/assets/11f53906-f4e1-45f9-a893-aa96b595af07



# Patrones de arquitectura y diseño  
 ## 🧩 **SOLID**

 💡 Qué es: Conjunto de principios que ayudan a mantener una alta cohesión y bajo acoplamiento en nuestro código.
 
 🚀 Beneficio: Facilita la mantenibilidad, escalabilidad y legibilidad del software, fomentando buenas prácticas de diseño.

## 🧠 **MVC (Modelo - Vista - Controlador)**

💡 Qué es: Patrón de arquitectura que separa la aplicación en tres capas:

- Modelo: Maneja los datos y la lógica del negocio.
- Vista: Se encarga de la interfaz con el usuario.
- Controlador: Coordina la comunicación entre modelo y vista.

🎯 Beneficio: Permite una estructura más organizada, reutilizable y fácil de mantener.

## 🧍‍♂️ **SINGLETON**

💡 Qué es: Patrón que asegura que solo exista una instancia de una clase y ofrece un único punto de acceso global.

🔐 Beneficio: Ideal para gestionar recursos compartidos como conexiones a base de datos, logs o configuraciones globales.

## 👀 **OBSERVER**

💡 Qué es: Patrón donde un objeto (sujeto) notifica automáticamente a otros (observadores) cuando ocurre un cambio en su estado.

🔔 Beneficio: Perfecto para sistemas de eventos, validaciones o notificaciones en tiempo real.

## 🗂️ **DAO (Data Access Object)**

💡 Qué es: Patrón que separa la lógica de acceso a datos de la lógica de negocio, permitiendo interactuar con la base de datos mediante objetos dedicados.

📦 Beneficio: Mejora la modularidad, facilita el mantenimiento y el cambio del motor de base de datos sin afectar el resto del sistema.

---

## 🏢 Acerca de la empresa  
**Hurios Rally** vende repuestos para vehículos menores.  Actualmente opera con procesos manuales, dificultando la rapidez, el control de inventario y la competitividad frente a empresas digitales.

---

## 🎯 Misión y Visión  
- **Misión ⚙️**: Ofrecer repuestos de calidad y un servicio confiable, facilitando compras rápidas y seguras mediante su nueva web.  
- **Visión ⭐**: Ser líder nacional en venta de repuestos en 5 años, con una plataforma digital consolidada y alcance a nuevos mercados.

---

## ⚠️ Problema identificado  
La empresa no cuenta con una plataforma en línea, provocando:  
- ⏳ Retrasos en atención.  
- 📉 Falta de datos precisos de inventario y precios.  
- 🚫 Pérdida de clientes ante opciones más ágiles.

---

## 💡 Solución propuesta  
Crear un **sistema web** que incluya:  
👤 Registro seguro de usuarios.  
🤖 Gestión automatizada de pedidos.  
💳 Pasarela de pago.  
📊 Panel de administración con inventario y reportes.  
📱 Diseño responsive.

---

## ⚙️ Requisitos funcionales  

- 👥 **Registro e inicio de sesión**: los clientes podrán crear cuentas y acceder con usuario y contraseña.  
- 🔎 **Catálogo digital**: búsqueda y visualización de productos en línea.  
- 🛒 **Carrito de compras**: añadir, modificar o eliminar productos fácilmente.  
- 💳 **Pagos en línea**: selección de método de pago y confirmación del pedido.  
- 🧾 **Facturación digital**: boletas o facturas descargables o enviadas al correo del cliente.
---


## 🚀 Requisitos no funcionales  
- 📱 **Responsive**: adaptable a móvil, tablet y PC.  
- 🔒 **Seguridad**: encriptación de datos y verificación de sesiones.  
- ⚡ **Rendimiento**: carga de páginas en menos de 3 segundos.  
- 🕒 **Disponibilidad**: sistema operativo al menos el 95 % del tiempo.


---

## 🧩 Lienzo Lean  
Modelo estratégico: propuesta de valor, clientes y ventajas competitivas.  
[🖼️ Ver lienzo](https://utpedupe-my.sharepoint.com/:i:/r/personal/u23200248_utp_edu_pe/Documents/Proyecto%20para%20la%20Empresa%20Hurios/EDT%20-%20LEANCANVAS/LEAN-CANVAS.png?csf=1&web=1&e=Zh2l1P)

---

## 🏗️ Estructura técnica  
- **Diagrama de capas**: organización de backend, frontend y servicios. [🔗 Ver diagrama de capas](https://utpedupe-my.sharepoint.com/:i:/r/personal/u23200248_utp_edu_pe/Documents/Proyecto%20para%20la%20Empresa%20Hurios/Diagramas/Diagrama%20de%20capas.png?csf=1&web=1&e=JcQOFK)  
- **Diagrama ER y clases**: modelado físico de la base de datos. [🔗  Ver ER](https://utpedupe-my.sharepoint.com/:i:/r/personal/u23200248_utp_edu_pe/Documents/Proyecto%20para%20la%20Empresa%20Hurios/Diagramas/ModeloConceptualBD.png?csf=1&web=1&e=LUOHGt) | [🔗 Diagrama De Clases](https://utpedupe-my.sharepoint.com/:i:/r/personal/u23200248_utp_edu_pe/Documents/Proyecto%20para%20la%20Empresa%20Hurios/Diagramas/Diagrama%20De%20Clases.jpg?csf=1&web=1&e=LHTXze)
- **📅 WBS y Gantt**: planificación del proyecto. [🔗 Ver WBS](https://utpedupe-my.sharepoint.com/:i:/r/personal/u23200248_utp_edu_pe/Documents/Proyecto%20para%20la%20Empresa%20Hurios/EDT%20-%20LEANCANVAS/wbs.jpeg?csf=1&web=1&e=Jexeag)  
-  **Diagramas de proceso**: flujo antes y después de la implementación. [🔗 Ver digrama de procesos](https://utpedupe-my.sharepoint.com/:i:/r/personal/u23200248_utp_edu_pe/Documents/Proyecto%20para%20la%20Empresa%20Hurios/Diagramas/Diagrama%20de%20procesos.png?csf=1&web=1&e=EkQZpH)


---

## 🎨 Maquetas  
Diseños en Figma:  
🖥️ [Opción 1](https://www.figma.com/design/gc8CHi6vDQF9jiQ3KA9XOb/Vista_Usuario_1?fuid=1541204056578805248#)  
🖥️ [Opción 2](https://www.figma.com/design/HLAsnYu1cTmO4OYunQD27S/Vista_Usuario_2?node-id=0-1&t=LRGjgNH0x6vQM66F-1)  
🖥️ [Opción 3](https://www.figma.com/design/HLAsnYu1cTmO4OYunQD27S/Vista_Usuario_2?node-id=0-1&t=LRGjgNH0x6vQM66F-1)

## Recorrido por el proyecto


https://github.com/user-attachments/assets/23db55e4-5fee-4192-ae2b-0dbd931725d4

## Recorrido por la web

https://github.com/user-attachments/assets/245120fb-74d3-425d-b8f4-2d54b0fa4c4a

