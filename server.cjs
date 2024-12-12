require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}));

app.use(express.json());
app.use(express.static('public'));

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const AUTHORIZED_GITHUB_USERNAME = process.env.AUTHORIZED_GITHUB_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GITHUB_OAUTH_URL = "https://github.com/login/oauth";

function isFullyAuthenticated(req, res, next) {
    if (req.session.isOAuthAuthenticated && req.session.isPasswordAuthenticated) {
        return next();
    }
    res.status(401).json({ success: false, message: 'No estás completamente autenticado.' });
}

app.get('/oauth/start', (req, res) => {
    const redirectUri = process.env.REDIRECT_URI || `${req.protocol}://${req.headers.host}/oauth/callback`;
    const url = `${GITHUB_OAUTH_URL}/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`;

    res.redirect(url);
});

app.get('/oauth/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send('No se proporcionó el código de autenticación.');

    try {
        const tokenRes = await axios.post(`${GITHUB_OAUTH_URL}/access_token`, {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code
        }, { headers: { 'Accept': 'application/json' } });

        const accessToken = tokenRes.data.access_token;
        if (!accessToken) return res.status(400).send('No se obtuvo el token de acceso.');

        const userRes = await axios.get('https://api.github.com/user', {
            headers: { 'Authorization': `token ${accessToken}` }
        });

        const userData = userRes.data;
        if (userData.login !== AUTHORIZED_GITHUB_USERNAME) {
            return res.status(403).send('No estás autorizado para acceder al panel de administración.');
        }

        req.session.isOAuthAuthenticated = true;
        req.session.githubUsername = userData.login;
        res.redirect('/verify-password.html');
    } catch (error) {
        res.status(500).send('Error interno del servidor.');
    }
});

app.post('/verify-password', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        req.session.isPasswordAuthenticated = true;
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Contraseña incorrecta.' });
    }
});

app.get('/admin.html', isFullyAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'protected', 'admin.html'));
});

app.get('/check-auth', (req, res) => {
    res.json({
        isOAuthAuthenticated: !!req.session.isOAuthAuthenticated,
        isPasswordAuthenticated: !!req.session.isPasswordAuthenticated,
        githubUsername: req.session.githubUsername || null
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Error al cerrar la sesión.');
        res.redirect('/');
    });
});

app.post('/save-translations', isFullyAuthenticated, (req, res) => {
    const newTranslations = req.body;
    try {
        fs.writeFileSync(path.join(__dirname, 'translations.json'), JSON.stringify(newTranslations, null, 4));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al guardar las traducciones.' });
    }
});

app.get('/translations.json', (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'translations.json'), 'utf-8');
        res.type('application/json').send(data);
    } catch (error) {
        res.status(500).send('Error interno del servidor.');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
