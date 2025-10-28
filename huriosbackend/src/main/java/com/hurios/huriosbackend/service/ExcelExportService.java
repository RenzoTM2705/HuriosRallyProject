package com.hurios.huriosbackend.service;

import com.hurios.huriosbackend.entity.Product;
import com.hurios.huriosbackend.entity.User;
import com.hurios.huriosbackend.repository.ProductRepository;
import com.hurios.huriosbackend.repository.UserRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * ExcelExportService - Servicio para exportar datos a Excel usando Apache POI
 */
@Service
public class ExcelExportService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public ExcelExportService(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /**
     * Exportar clientes a Excel
     */
    public byte[] exportClients() throws IOException {
        // Obtener solo usuarios con rol CLIENTE
        List<User> clients = userRepository.findAll().stream()
                .filter(user -> "CLIENTE".equals(user.getRole()))
                .toList();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Clientes");

            // Estilo para el header
            CellStyle headerStyle = createHeaderStyle(workbook);
            CellStyle dataStyle = createDataStyle(workbook);

            // Crear header
            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Nombre Completo", "Email", "Teléfono", "Dirección", "Fecha de Registro"};
            
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // Llenar datos
            int rowNum = 1;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            
            for (User client : clients) {
                Row row = sheet.createRow(rowNum++);
                
                createCell(row, 0, client.getId() != null ? client.getId().toString() : "", dataStyle);
                createCell(row, 1, client.getFullName() != null ? client.getFullName() : "", dataStyle);
                createCell(row, 2, client.getEmail() != null ? client.getEmail() : "", dataStyle);
                createCell(row, 3, client.getPhone() != null ? client.getPhone() : "", dataStyle);
                createCell(row, 4, client.getAddress() != null ? client.getAddress() : "", dataStyle);
                createCell(row, 5, client.getCreatedAt() != null ? client.getCreatedAt().format(formatter) : "", dataStyle);
            }

            // Auto-ajustar columnas
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Convertir a bytes
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    /**
     * Exportar productos a Excel
     */
    public byte[] exportProducts() throws IOException {
        List<Product> products = productRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Productos");

            // Estilo para el header
            CellStyle headerStyle = createHeaderStyle(workbook);
            CellStyle dataStyle = createDataStyle(workbook);
            CellStyle currencyStyle = createCurrencyStyle(workbook);

            // Crear header
            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Nombre", "Descripción", "Precio (S/)", "Stock", "Fecha de Creación"};
            
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // Llenar datos
            int rowNum = 1;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            
            for (Product product : products) {
                Row row = sheet.createRow(rowNum++);
                
                createCell(row, 0, product.getId() != null ? product.getId().toString() : "", dataStyle);
                createCell(row, 1, product.getName() != null ? product.getName() : "", dataStyle);
                createCell(row, 2, product.getDescription() != null ? product.getDescription() : "", dataStyle);
                
                // Precio con formato de moneda
                Cell priceCell = row.createCell(3);
                if (product.getPrice() != null) {
                    priceCell.setCellValue(product.getPrice());
                    priceCell.setCellStyle(currencyStyle);
                } else {
                    priceCell.setCellValue("");
                    priceCell.setCellStyle(dataStyle);
                }
                
                createCell(row, 4, product.getStock() != null ? product.getStock().toString() : "0", dataStyle);
                createCell(row, 5, product.getCreatedAt() != null ? product.getCreatedAt().format(formatter) : "", dataStyle);
            }

            // Auto-ajustar columnas
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Convertir a bytes
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    /**
     * Exportar ventas a Excel (placeholder - necesita implementación de entidad Sale)
     */
    public byte[] exportSales() throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Ventas");

            // Estilo para el header
            CellStyle headerStyle = createHeaderStyle(workbook);
            CellStyle dataStyle = createDataStyle(workbook);

            // Crear header
            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Cliente", "Producto", "Cantidad", "Precio Total", "Fecha"};
            
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // TODO: Cuando implementes la entidad Sale, agregar los datos aquí
            // Por ahora, solo creamos el archivo vacío con headers
            Row dataRow = sheet.createRow(1);
            createCell(dataRow, 0, "Sin ventas registradas", dataStyle);

            // Auto-ajustar columnas
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Convertir a bytes
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    // Métodos auxiliares para estilos

    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 12);
        font.setColor(IndexedColors.WHITE.getIndex());
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        return style;
    }

    private CellStyle createDataStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setAlignment(HorizontalAlignment.LEFT);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        return style;
    }

    private CellStyle createCurrencyStyle(Workbook workbook) {
        CellStyle style = createDataStyle(workbook);
        DataFormat format = workbook.createDataFormat();
        style.setDataFormat(format.getFormat("S/ #,##0.00"));
        return style;
    }

    private void createCell(Row row, int column, String value, CellStyle style) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
        cell.setCellStyle(style);
    }
}
