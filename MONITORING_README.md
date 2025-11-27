# 📊 Monitoreo con Prometheus y Grafana - Hurios Rally

## 📖 Descripción

Este documento describe la configuración de monitoreo para el sistema Hurios Rally usando **Prometheus** y **Grafana**.

- **Prometheus**: Sistema de monitoreo y base de datos de series temporales que recolecta métricas del backend.
- **Grafana**: Plataforma de visualización que crea dashboards interactivos a partir de las métricas de Prometheus.

---

## 🏗️ Arquitectura

```
┌─────────────────────┐
│  Spring Boot App    │
│  (Puerto 8080)      │
│  /actuator/         │
│  prometheus         │
└──────────┬──────────┘
           │ scraping
           │ métricas
           ▼
┌─────────────────────┐
│    Prometheus       │
│  (Puerto 9090)      │
│  Almacena métricas  │
└──────────┬──────────┘
           │ consultas
           │ PromQL
           ▼
┌─────────────────────┐
│     Grafana         │
│  (Puerto 3000)      │
│  Visualización      │
└─────────────────────┘
```

---

## 🚀 Inicio Rápido

### 1️⃣ Iniciar el Backend

Primero, asegúrate de que el backend Spring Boot esté ejecutándose:

```powershell
cd huriosbackend
.\mvnw spring-boot:run
```

El backend expondrá métricas en: `http://localhost:8080/actuator/prometheus`

### 2️⃣ Iniciar Prometheus y Grafana

En la raíz del proyecto, ejecuta:

```powershell
docker-compose -f docker-compose.monitoring.yml up -d
```

Esto iniciará:
- **Prometheus** en `http://localhost:9090`
- **Grafana** en `http://localhost:3000`

### 3️⃣ Acceder a Grafana

1. Abre tu navegador en `http://localhost:3000`
2. Inicia sesión con las credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
3. El dashboard "Hurios Rally - Spring Boot Metrics" se cargará automáticamente

---

## 📊 Métricas Disponibles

### Métricas HTTP
- **Tasa de solicitudes**: Requests por segundo
- **Duración de solicitudes**: Tiempo promedio de respuesta
- **Distribución de status codes**: 200, 400, 500, etc.

### Métricas JVM
- **Uso de memoria**: Heap, non-heap, metaspace
- **Garbage Collection**: Frecuencia y duración
- **Threads**: Threads activos, daemon, peak

### Métricas de Base de Datos
- **HikariCP**: Conexiones activas, idle, total
- **Tiempo de consultas**: Duración de queries

### Métricas del Sistema
- **CPU**: Uso de CPU del proceso y del sistema
- **Disco**: I/O operations
- **Estado de salud**: Health checks

---

## 🎨 Dashboard Predeterminado

El dashboard incluye los siguientes paneles:

1. **HTTP Requests Rate**: Tasa de requests HTTP por endpoint
2. **CPU Usage**: Uso de CPU en porcentaje
3. **JVM Memory Used**: Memoria JVM utilizada por área
4. **HTTP Request Duration**: Tiempo promedio de respuesta
5. **Application Status**: Estado UP/DOWN de la aplicación
6. **Active Threads**: Número de threads activos
7. **Database Connections**: Conexiones HikariCP (activas, idle, total)

---

## 🔧 Configuración

### Backend (Spring Boot)

Las métricas están configuradas en `application.properties`:

```properties
# Actuator endpoints
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.prometheus.enabled=true
management.metrics.export.prometheus.enabled=true
```

### Prometheus

La configuración está en `monitoring/prometheus/prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'huriosbackend'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 10s
    static_configs:
      - targets: ['host.docker.internal:8080']
```

### Grafana

- **Datasource**: Configurado automáticamente en `monitoring/grafana/provisioning/datasources/`
- **Dashboards**: Cargados automáticamente desde `monitoring/grafana/provisioning/dashboards/`

---

## 📝 Consultas PromQL Útiles

### Ver todos los endpoints HTTP:
```promql
rate(http_server_requests_seconds_count{application="huriosbackend"}[1m])
```

### CPU usage:
```promql
process_cpu_usage{application="huriosbackend"} * 100
```

### Memoria JVM:
```promql
jvm_memory_used_bytes{application="huriosbackend"}
```

### Conexiones de base de datos:
```promql
hikaricp_connections_active{application="huriosbackend"}
```

---

## 🛑 Detener los Servicios

Para detener Prometheus y Grafana:

```powershell
docker-compose -f docker-compose.monitoring.yml down
```

Para eliminar también los volúmenes (datos persistentes):

```powershell
docker-compose -f docker-compose.monitoring.yml down -v
```

---

## 🔍 Troubleshooting

### Prometheus no puede conectarse al backend

**Problema**: Error "context deadline exceeded" en Prometheus

**Solución**:
1. Verifica que el backend esté corriendo en `http://localhost:8080`
2. Prueba acceder manualmente a `http://localhost:8080/actuator/prometheus`
3. Si estás en Docker Desktop, asegúrate de que `host.docker.internal` funcione

### Grafana no muestra datos

**Problema**: Los paneles están vacíos o muestran "No data"

**Solución**:
1. Verifica que Prometheus esté recolectando métricas en `http://localhost:9090/targets`
2. Asegúrate de que el datasource de Prometheus esté configurado correctamente en Grafana
3. Verifica el rango de tiempo en Grafana (últimos 15 minutos por defecto)

### El dashboard no se carga automáticamente

**Problema**: No aparece el dashboard predeterminado

**Solución**:
1. Verifica que los archivos estén en `monitoring/grafana/provisioning/`
2. Reinicia el contenedor de Grafana: `docker restart hurios-grafana`
3. Importa manualmente el JSON desde `monitoring/grafana/provisioning/dashboards/json/spring-boot-dashboard.json`

---

## 📚 Recursos Adicionales

- [Documentación de Prometheus](https://prometheus.io/docs/)
- [Documentación de Grafana](https://grafana.com/docs/)
- [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
- [Micrometer](https://micrometer.io/docs)

---

## 🎯 Próximos Pasos

### Alertas
Puedes configurar alertas en Prometheus para notificaciones:

```yaml
# monitoring/prometheus/alerts/backend-alerts.yml
groups:
  - name: backend
    rules:
      - alert: HighErrorRate
        expr: rate(http_server_requests_seconds_count{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Alta tasa de errores 5xx"
```

### Métricas Personalizadas
Agrega métricas personalizadas en tu código Spring Boot:

```java
@Autowired
private MeterRegistry meterRegistry;

public void processOrder(Order order) {
    Counter.builder("orders.processed")
        .tag("status", order.getStatus())
        .register(meterRegistry)
        .increment();
}
```

### Node Exporter
Para monitorear el sistema operativo, descomenta la sección `node-exporter` en `docker-compose.monitoring.yml`.

---

## 👥 Autores

Configurado para el proyecto Hurios Rally E.I.R.L.
