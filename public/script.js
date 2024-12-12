let currentLanguage = 'es';
let translations = {};
let githubUsername = "mratomo"; // Por defecto, se actualizará tras login OAuth

// Definir comandos fijos, excluyendo 'admin'
const fixedTranslations = {
    "es": {
        "help": `
            <li><a href="#">about</a>: Perfil profesional</li>
            <li><a href="#">experience</a>: Experiencia laboral</li>
            <li><a href="#">skills</a>: Habilidades técnicas</li>
            <li><a href="#">education</a>: Formación académica</li>
            <li><a href="#">projects</a>: Mis proyectos en GitHub</li>
            <li><a href="#">contact</a>: Cómo contactarme</li>
            <li><a href="#">exit</a>: Limpiar la consola</li>
        `,
        "projects": "Obteniendo proyectos desde GitHub..."
    },
    "en": {
        "help": `
            <li><a href="#">about</a>: Professional profile</li>
            <li><a href="#">experience</a>: Work experience</li>
            <li><a href="#">skills</a>: Technical skills</li>
            <li><a href="#">education</a>: Academic background</li>
            <li><a href="#">projects</a>: My GitHub projects</li>
            <li><a href="#">contact</a>: How to contact me</li>
            <li><a href="#">exit</a>: Clear the console</li>
        `,
        "projects": "Fetching projects from GitHub..."
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    const input = document.getElementById('user-input');
    const output = document.getElementById('output');
    const languageSwitcher = document.getElementById('language-switcher');

    languageSwitcher.addEventListener('change', () => {
        currentLanguage = languageSwitcher.value;
        updateLanguage();
    });

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const userInput = input.value.trim();
            input.value = '';
            await handleCommand(userInput);
        }
    });

    function updateLanguage() {
        document.querySelectorAll('[data-lang]').forEach(el => {
            el.style.display = el.getAttribute('data-lang') === currentLanguage ? 'block' : 'none';
        });
    }

    async function handleCommand(command) {
        if (command === 'admin') {
            const isFullyAuthenticated = await checkAuthenticationStatus();
            if (!isFullyAuthenticated) {
                // Redirige al flujo OAuth
                window.location.href = '/oauth/start';
            } else {
                // Ya autenticado completamente
                window.location.href = 'admin.html';
            }
            return;
        }

        if (command === 'help') {
            // Mostrar ayuda sin repetir el menú
            const helpTitle = currentLanguage === 'es' ? '<h3>Comandos Disponibles</h3>' : '<h3>Available Commands</h3>';
            const helpContent = fixedTranslations[currentLanguage].help;
            output.innerHTML += `<p>${helpTitle}</p><ul>${helpContent}</ul>`;
            output.scrollTop = output.scrollHeight;
            return; // No repetir el menú de ayuda
        }

        if (command === 'projects') {
            const projectsTitle = currentLanguage === 'es' ? '<h3>Proyectos</h3>' : '<h3>Projects</h3>';
            output.innerHTML += `<p>${projectsTitle}${fixedTranslations[currentLanguage].projects}</p>`;
            const projects = await fetchGitHubProjects();
            output.innerHTML += `<p>${projects}</p>`;
            showPromptToHelp();
            return;
        }

        if (command === 'exit') {
            // Limpiar la consola
            output.innerHTML = '';
            // Opcional: añadir un mensaje de salida
            const exitMessage = currentLanguage === 'es' ? 'Consola limpiada.' : 'Console cleared.';
            output.innerHTML += `<p>${exitMessage}</p>`;
            showPromptToHelp();
            return;
        }

        if (translations[currentLanguage][command]) {
            // Convertir Markdown a HTML con Marked.js
            const markdownContent = translations[currentLanguage][command];
            const htmlContent = marked.parse(markdownContent);

            // Añadir contenido renderizado al área de salida
            output.innerHTML += `<div class="formatted-content">${htmlContent}</div>`;
            showPromptToHelp();
        } else {
            const error = currentLanguage === 'es'
                ? "Comando no reconocido. Escribe <span class='command'>help</span> para ver los comandos disponibles."
                : "Unrecognized command. Type <span class='command'>help</span> to see available commands.";
            output.innerHTML += `<p>${error}</p>`;
            showPromptToHelp();
        }
        output.scrollTop = output.scrollHeight;
    }

    async function loadTranslations() {
        try {
            const res = await fetch('/translations.json');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            translations = await res.json();
            console.log('Loaded translations:', translations);
        } catch (error) {
            console.error('Error loading translations:', error);
            alert('Error al cargar las traducciones.');
        }
    }

    async function checkAuthenticationStatus() {
        try {
            const response = await fetch('/check-auth');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.isOAuthAuthenticated && data.isPasswordAuthenticated) {
                githubUsername = data.githubUsername;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking authentication status:', error);
            return false;
        }
    }

    async function fetchGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
            if (!response.ok) {
                throw new Error(`GitHub API error! status: ${response.status}`);
            }
            const repos = await response.json();

            if (!Array.isArray(repos) || repos.length === 0) {
                return currentLanguage === 'es'
                    ? "No hay repositorios públicos en esta cuenta de GitHub."
                    : "No public repositories found for this GitHub account.";
            }

            let projectList = `<ul>`;
            repos.forEach(repo => {
                projectList += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
            });
            projectList += `</ul>`;
            return projectList;

        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            return currentLanguage === 'es'
                ? "Error al obtener los repositorios. Por favor, intenta más tarde."
                : "Error fetching repositories. Please try again later.";
        }
    }

    function showPromptToHelp() {
        const promptMessage = currentLanguage === 'es'
            ? "Escribe <span class='command'>help</span> para ver los comandos disponibles."
            : "Type <span class='command'>help</span> to see available commands.";
        output.innerHTML += `<p>${promptMessage}</p>`;
        output.scrollTop = output.scrollHeight;
    }

    updateLanguage();
});
