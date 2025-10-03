// EJEMPLO VULNERABLE - NO USAR EN PRODUCCIÓN
// Este código es vulnerable a SQL Injection

const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();

// Crear base de datos en memoria
const db = new sqlite3.Database(':memory:');

// Crear tabla de usuarios
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        email TEXT
    )`);

    // Insertar datos de ejemplo
    const stmt = db.prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    stmt.run("admin", "admin123", "admin@example.com");
    stmt.run("user1", "pass123", "user1@example.com");
    stmt.run("user2", "pass456", "user2@example.com");
    stmt.finalize();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VULNERABLE: Endpoint de login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // VULNERABLE: Concatenación de strings para construir SQL
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log('Ejecutando query:', query);

    db.get(query, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (row) {
            res.json({ 
                success: true, 
                message: 'Login exitoso',
                user: row 
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
    });
});

// VULNERABLE: Endpoint de búsqueda
app.get('/search', (req, res) => {
    const searchTerm = req.query.term;

    // VULNERABLE: Concatenación de strings
    const query = `SELECT username, email FROM users WHERE username LIKE '%${searchTerm}%'`;
    
    console.log('Ejecutando query:', query);

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ results: rows });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor VULNERABLE corriendo en http://localhost:${PORT}`);
    console.log('⚠️  ADVERTENCIA: Este código es vulnerable a SQL Injection');
    console.log('');
    console.log('Ejemplos de ataques:');
    console.log("  POST /login con username: admin' OR '1'='1");
    console.log("  GET /search?term=admin' UNION SELECT username, password FROM users--");
});
