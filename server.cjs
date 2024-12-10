// server.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Usar axios en lugar de node-fetch

const app = express();

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // Opciones de seguridad adicionales
        httpOnly: true,
        secure: false, // Cambia a true si usas HTTPS
        maxAge: 60 * 60 * 1000 // 1 hora
    }
}));

app.use(express.json());

// Servir archivos estáticos desde 'public'
app.use(express.static('public'));

// Variables de entorno
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const AUTHORIZED_GITHUB_USERNAME = process.env.AUTHORIZED_GITHUB_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GITHUB_OAUTH_URL = "https://github.com/login/oauth";

// Middleware para verificar autenticación OAuth
function isOAuthAuthenticated(req, res, next) {
    if (req.session.isOAuthAuthenticated) {
        return next();
    }
    res.status(401).json({ success: false, message: 'No estás autenticado vía OAuth.' });
}

// Middleware para verificar autenticación por contraseña
function isPasswordAuthenticated(req, res, next) {
    if (req.session.isPasswordAuthenticated) {
        return next();
    }
    res.status(401).json({ success: false, message: 'No estás autenticado por contraseña.' });
}

// Middleware para verificar ambas autenticaciones
function isFullyAuthenticated(req, res, next) {
    if (req.session.isOAuthAuthenticated && req.session.isPasswordAuthenticated) {
        return next();
    }
    res.status(401).json({ success: false, message: 'No estás completamente autenticado.' });
}

// Endpoint para iniciar OAuth con GitHub
app.get('/oauth/start', (req, res) => {
    const host = req.headers.host;
    const protocol = req.protocol;
    const redirectUri = `${protocol}://${host}/oauth/callback`;
    const url = `${GITHUB_OAUTH_URL}/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`;
    console.log(`Redirecting to GitHub OAuth URL: ${url}`); // Log para depuración
    res.redirect(url);
});

// Callback de GitHub OAuth usando axios
app.get('/oauth/callback', async (req, res) => {
    const code = req.query.code;
    console.log(`Received OAuth callback with code: ${code}`);
    if (!code) {
        console.error('No se proporcionó el código de autenticación.');
        return res.status(400).send('No se proporcionó el código de autenticación.');
    }

    try {
        // Intercambiar code por access_token usando axios
        const tokenRes = await axios.post(`${GITHUB_OAUTH_URL}/access_token`, {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code
        }, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const tokenData = tokenRes.data;
        console.log('Token Data:', tokenData);

        const accessToken = tokenData.access_token;
        if (!accessToken) {
            console.error('No se obtuvo el token de acceso.');
            return res.status(400).send('No se obtuvo el token de acceso.');
        }

        // Obtener info del usuario autenticado usando axios
        const userRes = await axios.get('https://api.github.com/user', {
            headers: { 'Authorization': `token ${accessToken}` }
        });
        const userData = userRes.data;
        console.log('User Data:', userData);

        // Verificar si el usuario es el autorizado
        if (userData.login !== AUTHORIZED_GITHUB_USERNAME) {
            console.warn(`Usuario ${userData.login} no está autorizado.`);
            return res.status(403).send('No estás autorizado para acceder al panel de administración.');
        }

        // Guardar info en la sesión
        req.session.isOAuthAuthenticated = true;
        req.session.githubUsername = userData.login;
        console.log(`Usuario ${userData.login} autenticado vía OAuth exitosamente.`);

        // Redirigir a la página de verificación de contraseña
        res.redirect('/verify-password.html');
    } catch (error) {
        console.error('Error durante el callback de OAuth:', error);
        res.status(500).send('Error interno del servidor.');
    }
});

// Endpoint para verificar autenticación por contraseña
app.post('/verify-password', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        req.session.isPasswordAuthenticated = true;
        console.log('Autenticación por contraseña exitosa.');
        res.json({ success: true, message: 'Contraseña correcta.' });
    } else {
        console.warn('Autenticación por contraseña fallida.');
        res.status(401).json({ success: false, message: 'Contraseña incorrecta.' });
    }
});

// Endpoint para verificar ambas autenticaciones
app.get('/admin.html', isFullyAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'protected', 'admin.html'));
});

// Endpoint para verificar autenticación
app.get('/check-auth', (req, res) => {
    res.json({
        isOAuthAuthenticated: !!req.session.isOAuthAuthenticated,
        isPasswordAuthenticated: !!req.session.isPasswordAuthenticated,
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

// Endpoint para guardar traducciones (protegido por autenticación completa)
app.post('/save-translations', isFullyAuthenticated, (req, res) => {
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
