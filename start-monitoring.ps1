# Script para iniciar el stack de monitoreo en Windows
# Hurios Rally - Prometheus & Grafana

Write-Host "🚀 Iniciando stack de monitoreo..." -ForegroundColor Green
Write-Host ""

# Verificar si Docker está instalado
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: Docker no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "   Instala Docker Desktop desde: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

# Verificar si Docker está corriendo
$dockerRunning = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Docker no está corriendo" -ForegroundColor Red
    Write-Host "   Inicia Docker Desktop y vuelve a ejecutar este script" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Docker está corriendo" -ForegroundColor Green
Write-Host ""

# Iniciar contenedores
Write-Host "📦 Iniciando Prometheus y Grafana..." -ForegroundColor Cyan
docker-compose -f docker-compose.monitoring.yml up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Stack de monitoreo iniciado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Accede a los servicios:" -ForegroundColor Cyan
    Write-Host "   • Prometheus: http://localhost:9090" -ForegroundColor White
    Write-Host "   • Grafana:    http://localhost:3000" -ForegroundColor White
    Write-Host ""
    Write-Host "🔑 Credenciales de Grafana:" -ForegroundColor Cyan
    Write-Host "   Usuario:   admin" -ForegroundColor White
    Write-Host "   Contraseña: admin123" -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  Asegúrate de que el backend esté corriendo en http://localhost:8080" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Error al iniciar los contenedores" -ForegroundColor Red
    Write-Host "   Verifica los logs con: docker-compose -f docker-compose.monitoring.yml logs" -ForegroundColor Yellow
    exit 1
}
