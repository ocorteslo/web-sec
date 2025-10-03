# Ejemplo: Cross-Site Scripting (XSS)

## ¿Qué es XSS?

Cross-Site Scripting (XSS) es una vulnerabilidad que permite a un atacante inyectar scripts maliciosos en páginas web vistas por otros usuarios.

## Tipos de XSS

1. **XSS Reflejado**: El script malicioso proviene de la petición HTTP actual
2. **XSS Almacenado**: El script malicioso se almacena en el servidor
3. **XSS Basado en DOM**: La vulnerabilidad existe en el código del lado del cliente

## Ejemplo Vulnerable

El código en `vulnerable/` muestra una aplicación web simple que es vulnerable a XSS porque no sanitiza la entrada del usuario antes de mostrarla en la página.

### Cómo Probar

1. Abrir `vulnerable/index.html` en un navegador
2. Ingresar: `<script>alert('XSS')</script>`
3. Observar que el script se ejecuta

## Ejemplo Seguro

El código en `secure/` muestra cómo prevenir XSS mediante:
- Codificación de salida (output encoding)
- Sanitización de entrada
- Content Security Policy (CSP)

### Técnicas de Prevención

1. **Codificación de Entidades HTML**: Convertir caracteres especiales a entidades HTML
2. **Validación de Entrada**: Validar y filtrar datos de entrada
3. **CSP**: Usar Content Security Policy headers
4. **HttpOnly Cookies**: Prevenir acceso a cookies desde JavaScript

## Impacto

Un ataque XSS exitoso puede:
- Robar cookies de sesión
- Redirigir a sitios maliciosos
- Modificar el contenido de la página
- Registrar pulsaciones de teclado

## Referencias

- [OWASP XSS](https://owasp.org/www-community/attacks/xss/)
- [MDN XSS](https://developer.mozilla.org/es/docs/Glossary/Cross-site_scripting)
