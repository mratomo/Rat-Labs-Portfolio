document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    const output = document.getElementById('output');
    const languageSwitcher = document.getElementById('language-switcher');

    const githubUsername = "mratomo"; // Tu usuario de GitHub

    const translations = {
        es: {
            help: "Comandos disponibles: <br> - about: Perfil profesional <br> - experience: Experiencia laboral <br> - skills: Habilidades técnicas <br> - education: Formación académica <br> - projects: Mis proyectos en GitHub <br> - contact: Cómo contactarme",
            about: `
                <h3>Perfil Profesional</h3>
                <p><strong>Militar profesional desde 2001</strong>, con una trayectoria destacada en operaciones especiales y tecnología. Experiencia avanzada en administración de sistemas, redes y desarrollo de software, con sólidos conocimientos en sistemas de información y comunicaciones militares.</p>
            `,
            experience: `
                <h3>Experiencia Laboral</h3>
                <ul>
                    <li><strong>Fuerzas Armadas (Armada Española)</strong>:
                        <ul>
                            <li>2001 - Presente: Militar profesional.</li>
                            <li>2010 - 2021: Miembro de la <strong>FGNE</strong> (Fuerza de Guerra Naval Especial), desempeñando distintos roles, incluido operador de sistemas tácticos de telecomunicaciones e información en el ámbito de las operaciones especiales.</li>
                        </ul>
                    </li>
                    <li><strong>Administrador de sistemas e infraestructura</strong>:
                        <ul>
                            <li>Gestión de entornos basados en Active Directory (AD): configuración, administración y mantenimiento de usuarios, políticas y servicios.</li>
                            <li>Experiencia en sistemas Linux, tanto en cliente como en servidor, y en soluciones de virtualización (Proxmox, VMware).</li>
                            <li>Implementación y mantenimiento de sistemas de información y comunicaciones militares.</li>
                        </ul>
                    </li>
                </ul>
            `,
            skills: `
                <h3>Habilidades Técnicas</h3>
                <ul>
                    <li><strong>Desarrollo de Software</strong>:
                        <ul>
                            <li>Lenguajes: HTML, CSS, JavaScript, Python, Rust, C/C++, Java, SQL.</li>
                            <li>Gestión de bases de datos: MySQL, PostgreSQL.</li>
                        </ul>
                    </li>
                    <li><strong>Administración de Sistemas</strong>:
                        <ul>
                            <li>Sistemas operativos: Linux (Ubuntu, CentOS, Red Hat), Windows Server (AD, DNS, DHCP, IIS).</li>
                            <li>Virtualización: Proxmox, VMware.</li>
                            <li>Contenedores: Docker.</li>
                        </ul>
                    </li>
                    <li><strong>Redes</strong>:
                        <ul>
                            <li>Protocolos: TCP/IP, DNS, DHCP, FTP, SMTP, HTTP/HTTPS.</li>
                            <li>Configuración y mantenimiento de redes.</li>
                        </ul>
                    </li>
                    <li><strong>Seguridad</strong>:
                        <ul>
                            <li>Gestión de firewalls.</li>
                            <li>Aplicación de parches de seguridad y auditorías.</li>
                        </ul>
                    </li>
                </ul>
            `,
            education: `
                <h3>Formación Académica</h3>
                <ul>
                    <li><strong>Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación</strong> (en curso)
                        <ul>
                            <li>Mención en <strong>Sistemas Telemáticos</strong>.</li>
                            <li>Mención en <strong>Sistemas de Telecomunicación</strong>.</li>
                        </ul>
                    </li>
                    <li><strong>Ciclo Formativo de Grado Superior (CFGS)</strong>:
                        <ul>
                            <li>Desarrollo de Aplicaciones Multiplataforma (DAM).</li>
                            <li>Administración de Sistemas Informáticos en Red (ASIR).</li>
                        </ul>
                    </li>
                </ul>
            `,
            projects: "Obteniendo proyectos desde GitHub...",
            contact: `
                <h3>Contacto</h3>
                <p>📧 <a href='mailto:Operador_rata@pm.me'>Operador_rata@pm.me</a></p>
            `
        },
        en: {
            help: "Available commands: <br> - about: Professional profile <br> - experience: Work experience <br> - skills: Technical skills <br> - education: Academic background <br> - projects: My GitHub projects <br> - contact: How to contact me",
            about: `
                <h3>Professional Profile</h3>
                <p><strong>Professional soldier since 2001</strong>, with a distinguished career in special operations and technology. Advanced experience in systems administration, networks, and software development, with solid knowledge of military information and communication systems.</p>
            `,
            experience: `
                <h3>Work Experience</h3>
                <ul>
                    <li><strong>Armed Forces (Spanish Navy)</strong>:
                        <ul>
                            <li>2001 - Present: Professional soldier.</li>
                            <li>2010 - 2021: Member of <strong>FGNE</strong> (Naval Special Warfare Force), performing various roles, including tactical telecommunications and information systems operator in special operations.</li>
                        </ul>
                    </li>
                    <li><strong>Systems and Infrastructure Administrator</strong>:
                        <ul>
                            <li>Management of Active Directory (AD) environments: configuration, administration, and maintenance of users, policies, and services.</li>
                            <li>Experience in Linux systems, both client and server, and virtualization solutions (Proxmox, VMware).</li>
                            <li>Implementation and maintenance of military information and communication systems.</li>
                        </ul>
                    </li>
                </ul>
            `,
            skills: `
                <h3>Technical Skills</h3>
                <ul>
                    <li><strong>Software Development</strong>:
                        <ul>
                            <li>Languages: HTML, CSS, JavaScript, Python, Rust, C/C++, Java, SQL.</li>
                            <li>Database management: MySQL, PostgreSQL.</li>
                        </ul>
                    </li>
                    <li><strong>System Administration</strong>:
                        <ul>
                            <li>Operating systems: Linux (Ubuntu, CentOS, Red Hat), Windows Server (AD, DNS, DHCP, IIS).</li>
                            <li>Virtualization: Proxmox, VMware.</li>
                            <li>Containers: Docker.</li>
                        </ul>
                    </li>
                    <li><strong>Networking</strong>:
                        <ul>
                            <li>Protocols: TCP/IP, DNS, DHCP, FTP, SMTP, HTTP/HTTPS.</li>
                            <li>Network configuration and maintenance.</li>
                        </ul>
                    </li>
                    <li><strong>Security</strong>:
                        <ul>
                            <li>Firewall management.</li>
                            <li>Patch management and audits.</li>
                        </ul>
                    </li>
                </ul>
            `,
            education: `
                <h3>Academic Background</h3>
                <ul>
                    <li><strong>Bachelor's Degree in Telecommunications Technologies and Services Engineering</strong> (ongoing)
                        <ul>
                            <li>Specialization in <strong>Telematics Systems</strong>.</li>
                            <li>Specialization in <strong>Telecommunication Systems</strong>.</li>
                        </ul>
                    </li>
                    <li><strong>Higher Vocational Training (HVT)</strong>:
                        <ul>
                            <li>Multiplatform Application Development (MAD).</li>
                            <li>Network Systems Administration (NSA).</li>
                        </ul>
                    </li>
                </ul>
            `,
            projects: "Fetching projects from GitHub...",
            contact: `
                <h3>Contact</h3>
                <p>📧 <a href='mailto:Operador_rata@pm.me'>Operador_rata@pm.me</a></p>
            `
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
