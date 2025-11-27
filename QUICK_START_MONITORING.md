# 🚀 Inicio Rápido - Monitoreo con Prometheus y Grafana

## ⚡ Pasos Rápidos

### 1. Instalar Dependencias del Backend

Las dependencias ya están configuradas en `huriosbackend/pom.xml`. Solo necesitas actualizar el proyecto:

```powershell
cd huriosbackend
.\mvnw clean install
```

### 2. Iniciar el Backend

```powershell
cd huriosbackend
.\mvnw spring-boot:run
```

El backend expondrá métricas en: `http://localhost:8080/actuator/prometheus`

### 3. Verificar Métricas del Backend

Abre en tu navegador: `http://localhost:8080/actuator/prometheus`

Deberías ver algo como:

```
# HELP jvm_memory_used_bytes Used memory
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="heap",id="G1 Survivor Space"} 8388608.0
...
```

### 4. Iniciar Docker (si no está corriendo)

Abre Docker Desktop y espera a que inicie completamente.

### 5. Iniciar Prometheus y Grafana

**Opción A: Usando el script de PowerShell**

```powershell
.\start-monitoring.ps1
```

**Opción B: Manual con docker-compose**

```powershell
docker-compose -f docker-compose.monitoring.yml up -d
```

### 6. Verificar que los contenedores están corriendo

```powershell
docker ps
```

Deberías ver:
- `hurios-prometheus`
- `hurios-grafana`

### 7. Acceder a Prometheus

Abre: `http://localhost:9090`

- Ve a "Status" → "Targets"
- Verifica que `huriosbackend` esté "UP"

### 8. Acceder a Grafana

Abre: `http://localhost:3000`

Credenciales:
- **Usuario**: `admin`
- **Contraseña**: `admin123`

### 9. Ver el Dashboard

El dashboard "Hurios Rally - Spring Boot Metrics" se cargará automáticamente.

---

## 🎯 Verificación

### ✅ Checklist

- [ ] Backend corriendo en `http://localhost:8080`
- [ ] Métricas visibles en `http://localhost:8080/actuator/prometheus`
- [ ] Docker Desktop corriendo
- [ ] Prometheus corriendo en `http://localhost:9090`
- [ ] Grafana corriendo en `http://localhost:3000`
- [ ] Target `huriosbackend` en estado "UP" en Prometheus
- [ ] Dashboard visible en Grafana

---

## 🛑 Detener Todo

Para detener Prometheus y Grafana:

```powershell
docker-compose -f docker-compose.monitoring.yml down
```

Para detener el backend:

Presiona `Ctrl+C` en la terminal donde está corriendo.

---

## ❓ Problemas Comunes

### Prometheus no puede conectarse al backend

**Error**: "context deadline exceeded"

**Solución**:
1. Verifica que el backend esté corriendo
2. Accede manualmente a `http://localhost:8080/actuator/prometheus`
3. Si falla, revisa `application.properties`

### Grafana muestra "No data"

**Solución**:
1. Ve a Prometheus `http://localhost:9090/targets`
2. Verifica que el target esté "UP"
3. Espera unos segundos a que se recolecten datos
4. Ajusta el rango de tiempo en Grafana (esquina superior derecha)

### Docker no inicia

**Solución**:
1. Abre Docker Desktop
2. Espera a que el ícono esté verde
3. Prueba: `docker ps`

---

## 📚 Siguiente Paso

Lee la documentación completa: [MONITORING_README.md](MONITORING_README.md)

Para ejemplos de métricas personalizadas: [huriosbackend/METRICS_USAGE_EXAMPLE.md](huriosbackend/METRICS_USAGE_EXAMPLE.md)
