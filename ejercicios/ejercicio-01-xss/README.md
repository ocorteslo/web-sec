# Ejercicio 1: Prevención de XSS

## Objetivo
Corregir las vulnerabilidades XSS en una aplicación web simple.

## Descripción del Problema
Se te proporciona una aplicación web que permite a los usuarios enviar y visualizar mensajes. La aplicación tiene vulnerabilidades XSS que permiten la ejecución de scripts maliciosos.

## Archivos
- `app.html` - Aplicación web vulnerable
- `test.html` - Página de pruebas para verificar tu solución

## Tareas

1. **Identificar las vulnerabilidades XSS** en el código
2. **Corregir las vulnerabilidades** usando técnicas apropiadas de sanitización
3. **Verificar** que la aplicación ya no es vulnerable usando los casos de prueba

## Casos de Prueba

Intenta ingresar los siguientes inputs. Después de corregir, ninguno debería ejecutar JavaScript:

1. `<script>alert('XSS')</script>`
2. `<img src=x onerror=alert('XSS')>`
3. `<svg onload=alert('XSS')>`
4. `javascript:alert('XSS')`
5. `<iframe src="javascript:alert('XSS')"></iframe>`

## Criterios de Éxito

- ✓ Ninguno de los casos de prueba ejecuta JavaScript
- ✓ El texto ingresado se muestra correctamente (escapado)
- ✓ La funcionalidad básica de la aplicación se mantiene
- ✓ Se implementa Content Security Policy (bonus)

## Pistas

1. Usa `textContent` en lugar de `innerHTML` cuando sea posible
2. Si necesitas usar HTML, sanitiza la entrada primero
3. Considera implementar una función `escapeHtml()`
4. Agrega headers CSP en el `<meta>` tag

## Solución

La solución se encuentra en la carpeta `solucion/` (intenta resolverlo sin mirar primero).

## Recursos

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Content Security Policy](https://developer.mozilla.org/es/docs/Web/HTTP/CSP)
