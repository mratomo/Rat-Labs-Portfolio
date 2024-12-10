// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // Asegúrate de tener node-fetch@2 instalado

const app = express();

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

// Servir archivos estáticos desde 'public'
app.use(express.static('public'));

// Variables de entorno
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const AUTHORIZED_GITHUB_USERNAME = process.env.AUTHORIZED_GITHUB_USERNAME;
const GITHUB_OAUTH_URL = "https://github.com/login/oauth";

// Middleware para verificar autenticación
function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    }
    res.status(401).json({ success: false, message: 'No estás autenticado.' });
}

// Endpoint para iniciar OAuth con GitHub
app.get('/oauth/start', (req, res) => {
    const redirectUri = `http://localhost:3000/oauth/callback`;
    const url = `${GITHUB_OAUTH_URL}/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`;
    res.redirect(url);
});

// Callback de GitHub OAuth
app.get('/oauth/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No se proporcionó el código de autenticación.');
    }

    try {
        // Intercambiar code por access_token
        const tokenRes = await fetch(`${GITHUB_OAUTH_URL}/access_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code
            })
        });
        const tokenData = await tokenRes.json();

        const accessToken = tokenData.access_token;
        if (!accessToken) {
            return res.status(400).send('No se obtuvo el token de acceso.');
        }

        // Obtener info del usuario autenticado
        const userRes = await fetch('https://api.github.com/user', {
            headers: { 'Authorization': `token ${accessToken}` }
        });
        const userData = await userRes.json();

        // Verificar si el usuario es el autorizado
        if (userData.login !== AUTHORIZED_GITHUB_USERNAME) {
            return res.status(403).send('No estás autorizado para acceder al panel de administración.');
        }

        // Guardar info en la sesión
        req.session.isAuthenticated = true;
        req.session.githubUsername = userData.login;

        // Redirigir a la página admin
        res.redirect('/admin.html');
    } catch (error) {
        console.error('Error durante el callback de OAuth:', error);
        res.status(500).send('Error interno del servidor.');
    }
});

// Endpoint para verificar autenticación
app.get('/check-auth', (req, res) => {
    res.json({
        isAuthenticated: !!req.session.isAuthenticated,
        githubUsername: req.session.githubUsername || null
    });
});

// Endpoint para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            return res.status(500).send('Error al cerrar la sesión.');
        }
        res.redirect('/');
    });
});

// Endpoint para guardar traducciones (protegido por autenticación)
app.post('/save-translations', isAuthenticated, (req, res) => {
    const newTranslations = req.body;
    console.log('Recibidas traducciones:', newTranslations); // Log para depuración

    try {
        fs.writeFileSync(path.join(__dirname, 'translations.json'), JSON.stringify(newTranslations, null, 4));
        console.log('Traducciones guardadas exitosamente.'); // Log para depuración
        res.json({ success: true });
    } catch (error) {
        console.error('Error al guardar las traducciones:', error);
        res.status(500).json({ success: false, message: 'Error al guardar las traducciones.' });
    }
});

// Endpoint para servir admin.html solo si está autenticado
app.get('/admin.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'protected', 'admin.html'));
});

// Endpoint para servir el JSON de traducciones
app.get('/translations.json', (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'translations.json'), 'utf-8');
        res.type('application/json').send(data);
    } catch (error) {
        console.error('Error al leer las traducciones:', error);
        res.status(500).send('Error interno del servidor.');
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
