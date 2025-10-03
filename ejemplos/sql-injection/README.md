# Ejemplo: SQL Injection

## ¿Qué es SQL Injection?

SQL Injection es una vulnerabilidad que permite a un atacante ejecutar comandos SQL arbitrarios en la base de datos de una aplicación.

## Tipos de SQL Injection

1. **In-band SQLi**: El atacante obtiene los resultados directamente
   - Error-based SQLi
   - Union-based SQLi

2. **Blind SQLi**: El atacante no ve los resultados directamente
   - Boolean-based blind SQLi
   - Time-based blind SQLi

3. **Out-of-band SQLi**: Usa canales alternativos para obtener datos

## Ejemplo Vulnerable

El código en `vulnerable/` muestra una aplicación Node.js que construye consultas SQL concatenando strings, lo cual es vulnerable a inyección SQL.

### Ataques Comunes

```sql
-- Bypass de autenticación
' OR '1'='1

-- Obtener información de la base de datos
' UNION SELECT username, password FROM users--

-- Eliminar tablas
'; DROP TABLE users--
```

## Ejemplo Seguro

El código en `secure/` muestra cómo prevenir SQL Injection mediante:
- **Consultas Parametrizadas** (Prepared Statements)
- **ORM** (Object-Relational Mapping)
- **Validación de entrada**
- **Principio de mínimo privilegio**

### Técnicas de Prevención

1. **Usar Consultas Parametrizadas**: Nunca concatenar strings para construir SQL
2. **Validar y Sanitizar Entrada**: Verificar tipo y formato de datos
3. **Escapar Caracteres Especiales**: Usar funciones de escape de la biblioteca
4. **Usar ORM**: Frameworks como Sequelize, TypeORM, Prisma
5. **Principio de Mínimo Privilegio**: La cuenta de base de datos debe tener solo los permisos necesarios

## Impacto

Un ataque SQL Injection exitoso puede:
- Leer datos sensibles de la base de datos
- Modificar o eliminar datos
- Ejecutar operaciones administrativas
- Acceder al sistema operativo del servidor

## Código de Ejemplo

### Vulnerable (NO USAR)
```javascript
const query = "SELECT * FROM users WHERE username = '" + username + "'";
db.query(query);
```

### Seguro
```javascript
const query = "SELECT * FROM users WHERE username = ?";
db.query(query, [username]);
```

## Referencias

- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [SQL Injection Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
