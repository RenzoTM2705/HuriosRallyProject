package com.hurios.huriosbackend.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * EmailService: wrapper sencillo para enviar correos HTML usando JavaMailSender.
 * - la propiedad spring.mail.username se usa como from.
 */
@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Value("${app.email.mock:false}")
    private boolean mockEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Método para enviar HTML con fallback en caso de error
    public void sendHtml(String to, String subject, String html) throws Exception {
        if (mockEmail) {
            // Modo desarrollo - simular envío
            logger.info("\n" + "=".repeat(50));
            logger.info("[MOCK EMAIL] To: {}", to);
            logger.info("[MOCK EMAIL] Subject: {}", subject);
            logger.info("[MOCK EMAIL] Content: {}", html);
            logger.info("=".repeat(50) + "\n");
            return;
        }

        try {
            logger.info("Attempting to send email to: {}", to);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true); // true => HTML
            
            mailSender.send(message);
            logger.info("✓ Email sent successfully to: {}", to);
            
        } catch (Exception e) {
            logger.error("❌ Failed to send email to {}: {}", to, e.getMessage());
            logger.error("Full error: ", e);
            
            // En desarrollo, mostrar el contenido del email
            logger.info("\n" + "=".repeat(50));
            logger.info("[EMAIL FALLBACK] To: {}", to);
            logger.info("[EMAIL FALLBACK] Subject: {}", subject);
            logger.info("[EMAIL FALLBACK] Content: {}", html);
            logger.info("=".repeat(50) + "\n");
            
            // Re-throw para que el AuthService pueda manejar el error
            throw new Exception("Error al enviar email: " + e.getMessage());
        }
    }
}
