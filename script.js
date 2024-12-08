document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    const output = document.getElementById('output');
    const languageSwitcher = document.getElementById('language-switcher');

    const githubUsername = "mratomo"; // Tu usuario de GitHub

    const translations = {
        es: {
            help: "Comandos disponibles: <br> - about: Sobre mí <br> - skills: Mis habilidades <br> - projects: Mis proyectos en GitHub <br> - contact: Cómo contactarme",
            about: "¡Hola! Soy un desarrollador apasionado por crear soluciones innovadoras.",
            skills: "JavaScript, Python, HTML/CSS, React, Node.js.",
            contact: "Puedes contactarme en mi email: <a href='mailto:tuemail@example.com'>tuemail@example.com</a>",
            projects: "Obteniendo proyectos desde GitHub...",
        },
        en: {
            help: "Available commands: <br> - about: About me <br> - skills: My skills <br> - projects: My GitHub projects <br> - contact: How to contact me",
            about: "Hi! I am a developer passionate about creating innovative solutions.",
            skills: "JavaScript, Python, HTML/CSS, React, Node.js.",
            contact: "You can reach me at my email: <a href='mailto:tuemail@example.com'>tuemail@example.com</a>",
            projects: "Fetching projects from GitHub...",
        }
    };

    let currentLanguage = 'es';

    languageSwitcher.addEventListener('change', () => {
        currentLanguage = languageSwitcher.value;
        updateLanguage();
    });

    function updateLanguage() {
        document.querySelectorAll('[data-lang]').forEach(el => {
            el.style.display = el.getAttribute('data-lang') === currentLanguage ? 'block' : 'none';
        });
    }

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userInput = input.value.trim();
            input.value = '';
            handleCommand(userInput);
        }
    });

    async function fetchGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
            const repos = await response.json();

            if (repos.length === 0) {
                return currentLanguage === 'es'
                    ? "No hay repositorios públicos en tu cuenta de GitHub."
                    : "No public repositories found on your GitHub account.";
            }

            let projectList = `<ul>`;
            repos.forEach(repo => {
                projectList += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
            });
            projectList += `</ul>`;
            return projectList;

        } catch (error) {
            return currentLanguage === 'es'
                ? "Error al obtener los repositorios. Por favor, intenta más tarde."
                : "Error fetching repositories. Please try again later.";
        }
    }

    async function handleCommand(command) {
        if (command === 'projects') {
            output.innerHTML += `<p>${translations[currentLanguage].projects}</p>`;
            const projects = await fetchGitHubProjects();
            output.innerHTML += `<p>${projects}</p>`;
        } else if (translations[currentLanguage][command]) {
            output.innerHTML += `<p>${translations[currentLanguage][command]}</p>`;
        } else {
            const error = currentLanguage === 'es'
                ? "Comando no reconocido. Escribe <span class='command'>help</span> para ver los comandos disponibles."
                : "Unrecognized command. Type <span class='command'>help</span> to see available commands.";
            output.innerHTML += `<p>${error}</p>`;
        }
        output.scrollTop = output.scrollHeight;
    }
});
