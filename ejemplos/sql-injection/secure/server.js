// CÓDIGO SEGURO - Prevención de SQL Injection

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

    // Insertar datos de ejemplo usando prepared statements
    const stmt = db.prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    stmt.run("admin", "admin123", "admin@example.com");
    stmt.run("user1", "pass123", "user1@example.com");
    stmt.run("user2", "pass456", "user2@example.com");
    stmt.finalize();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Función de validación de entrada
function validateInput(input, maxLength = 50) {
    if (typeof input !== 'string') {
        return false;
    }
    if (input.length > maxLength) {
        return false;
    }
    // Permitir solo caracteres alfanuméricos y algunos especiales
    const safePattern = /^[a-zA-Z0-9@._-]+$/;
    return safePattern.test(input);
}

// SEGURO: Endpoint de login con prepared statements
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Validar entrada
    if (!validateInput(username) || !validateInput(password)) {
        res.status(400).json({ 
            success: false, 
            message: 'Entrada inválida' 
        });
        return;
    }

    // SEGURO: Usar prepared statements con placeholders
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Error de base de datos:', err);
            res.status(500).json({ 
                success: false, 
                message: 'Error del servidor' 
            });
            return;
        }

        if (row) {
            // No exponer información sensible
            res.json({ 
                success: true, 
                message: 'Login exitoso',
                user: {
                    id: row.id,
                    username: row.username,
                    email: row.email
                    // No incluir password
                }
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
    });
});

// SEGURO: Endpoint de búsqueda con prepared statements
app.get('/search', (req, res) => {
    const searchTerm = req.query.term;

    // Validar entrada
    if (!validateInput(searchTerm, 30)) {
        res.status(400).json({ 
            success: false, 
            message: 'Término de búsqueda inválido' 
        });
        return;
    }

    // SEGURO: Usar prepared statements
    const query = 'SELECT username, email FROM users WHERE username LIKE ?';
    const searchPattern = `%${searchTerm}%`;
    
    db.all(query, [searchPattern], (err, rows) => {
        if (err) {
            console.error('Error de base de datos:', err);
            res.status(500).json({ 
                success: false, 
                message: 'Error del servidor' 
            });
            return;
        }
        res.json({ 
            success: true, 
            results: rows 
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor SEGURO corriendo en http://localhost:${PORT}`);
    console.log('✓ Protegido contra SQL Injection');
    console.log('');
    console.log('Medidas de seguridad implementadas:');
    console.log('  - Prepared statements con placeholders');
    console.log('  - Validación de entrada');
    console.log('  - Limitación de longitud de strings');
    console.log('  - No exposición de información sensible');
});
