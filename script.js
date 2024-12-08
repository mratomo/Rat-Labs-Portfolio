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
                    <li><strong>Sistemas Operativos</strong>:
                        <ul>
                            <li>Linux/Unix: Proficiencia en distribuciones como Ubuntu, CentOS, y Red Hat.</li>
                            <li>Windows Server: Administración de Active Directory, políticas de grupo (Group Policies) y roles de servidor (DNS, DHCP, IIS).</li>
                            <li>MacOS: Conocimiento de infraestructuras basadas en Mac (menos común pero útil en entornos mixtos).</li>
                        </ul>
                    </li>
                    <li><strong>Redes</strong>:
                        <ul>
                            <li>Configuración de redes: Conocimientos sobre routers, switches, firewalls y VLANs.</li>
                            <li>Protocolos: Comprensión de TCP/IP, DNS, DHCP, FTP, SMTP, HTTP/HTTPS, SNMP.</li>
                            <li>Resolución de problemas: Uso de herramientas como Wireshark, tcpdump y traceroute.</li>
                            <li>VPNs: Configuración y mantenimiento de redes privadas virtuales.</li>
                        </ul>
                    </li>
                    <li><strong>Gestión de Servidores</strong>:
                        <ul>
                            <li>Virtualización: Experiencia con Proxmox, VMware, Hyper-V y KVM.</li>
                            <li>Infraestructura en la Nube: Familiaridad con AWS, Azure y Google Cloud.</li>
                            <li>Contenedores: Comprensión y uso de Docker y Kubernetes.</li>
                            <li>Respaldo y Recuperación: Implementación de estrategias de recuperación ante desastres y herramientas como Veeam, Bacula.</li>
                        </ul>
                    </li>
                    <li><strong>Seguridad</strong>:
                        <ul>
                            <li>Gestión de Firewalls: Configuración de firewalls de hardware y software.</li>
                            <li>Detección de intrusiones: Familiaridad con herramientas como Snort u OSSEC.</li>
                            <li>Gestión de parches: Aplicación de actualizaciones y parches de seguridad.</li>
                            <li>Gestión de Identidades y Accesos (IAM): Asegurar cuentas de usuario y permisos.</li>
                            <li>Auditorías y Cumplimiento: Supervisión de logs y cumplimiento de normativas (e.g., GDPR, HIPAA).</li>
                        </ul>
                    </li>
                    <li><strong>Automatización y Scripting</strong>:
                        <ul>
                            <li>Lenguajes de scripting: Bash, PowerShell, Python.</li>
                            <li>Gestión de Configuración: Uso de herramientas como Ansible, Puppet, Chef o SaltStack.</li>
                            <li>Automatización de tareas: Configuración de Cron Jobs y planificadores de tareas.</li>
                        </ul>
                    </li>
                    <li><strong>Monitoreo y Rendimiento</strong>:
                        <ul>
                            <li>Herramientas de monitoreo: Nagios, Zabbix, Prometheus, SolarWinds.</li>
                            <li>Gestión de Recursos: Monitoreo de CPU, memoria, uso de disco e IOPS.</li>
                            <li>Diagnóstico: Resolución de cuellos de botella en el rendimiento.</li>
                        </ul>
                    </li>
                    <li><strong>Almacenamiento y Bases de Datos</strong>:
                        <ul>
                            <li>Sistemas de Archivos: Conocimientos sobre NTFS, ext4, ZFS, entre otros.</li>
                            <li>SAN/NAS: Gestión de sistemas de almacenamiento y protocolos como iSCSI, NFS, SMB.</li>
                            <li>Gestión de Bases de Datos: Comprensión básica de SQL y experiencia con MySQL, PostgreSQL y MSSQL.</li>
                        </ul>
                    </li>
                    <li><strong>Gestión de Software y Aplicaciones</strong>:
                        <ul>
                            <li>Servidores Web: Configuración y mantenimiento de Apache, Nginx, IIS.</li>
                            <li>Servidores de Correo: Gestión de Postfix, Exchange o sistemas similares.</li>
                            <li>Herramientas de Colaboración: Configuración de plataformas como SharePoint, Slack, Microsoft Teams.</li>
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
        <p><strong>Professional soldier since 2001</strong>, with a distinguished career in special operations and technology. Advanced experience in systems administration, networking, and software development, with solid knowledge of military information and communication systems.</p>
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
                    <li>Experience with Linux systems, both client and server, and virtualization solutions (Proxmox, VMware).</li>
                    <li>Implementation and maintenance of military information and communication systems.</li>
                </ul>
            </li>
        </ul>
    `,
            skills: `
        <h3>Technical Skills</h3>
        <ul>
            <li><strong>Operating Systems</strong>:
                <ul>
                    <li>Linux/Unix: Proficiency with distributions like Ubuntu, CentOS, and Red Hat.</li>
                    <li>Windows Server: Active Directory administration, Group Policies, and server roles (DNS, DHCP, IIS).</li>
                    <li>MacOS: Understanding of Mac-based infrastructure (less common but useful in mixed environments).</li>
                </ul>
            </li>
            <li><strong>Networking</strong>:
                <ul>
                    <li>Network configuration: Knowledge of routers, switches, firewalls, and VLANs.</li>
                    <li>Protocols: Understanding of TCP/IP, DNS, DHCP, FTP, SMTP, HTTP/HTTPS, SNMP.</li>
                    <li>Network troubleshooting: Using tools like Wireshark, tcpdump, and traceroute.</li>
                    <li>VPNs: Configuring and maintaining Virtual Private Networks.</li>
                </ul>
            </li>
            <li><strong>Server Management</strong>:
                <ul>
                    <li>Virtualization: Expertise in Proxmox, VMware, Hyper-V, and KVM.</li>
                    <li>Cloud Infrastructure: Experience with AWS, Azure, and Google Cloud.</li>
                    <li>Containers: Understanding and usage of Docker and Kubernetes.</li>
                    <li>Backup and Recovery: Implementing disaster recovery strategies and tools like Veeam and Bacula.</li>
                </ul>
            </li>
            <li><strong>Security</strong>:
                <ul>
                    <li>Firewall Management: Configuring software and hardware firewalls.</li>
                    <li>Intrusion Detection: Familiarity with tools like Snort and OSSEC.</li>
                    <li>Patch Management: Applying updates and security patches.</li>
                    <li>Identity and Access Management (IAM): Securing user accounts and permissions.</li>
                    <li>Auditing and Compliance: Monitoring logs and ensuring systems meet regulatory standards (e.g., GDPR, HIPAA).</li>
                </ul>
            </li>
            <li><strong>Scripting and Automation</strong>:
                <ul>
                    <li>Scripting languages: Bash, PowerShell, Python.</li>
                    <li>Configuration Management: Tools like Ansible, Puppet, Chef, or SaltStack.</li>
                    <li>Task Automation: Setting up Cron Jobs and task schedulers.</li>
                </ul>
            </li>
            <li><strong>Monitoring and Performance</strong>:
                <ul>
                    <li>Monitoring Tools: Nagios, Zabbix, Prometheus, SolarWinds.</li>
                    <li>Resource Management: Monitoring CPU, memory, disk usage, and IOPS.</li>
                    <li>Troubleshooting: Diagnosing and resolving performance bottlenecks.</li>
                </ul>
            </li>
            <li><strong>Storage and Databases</strong>:
                <ul>
                    <li>File Systems: Understanding NTFS, ext4, ZFS, etc.</li>
                    <li>SAN/NAS: Managing storage systems and protocols like iSCSI, NFS, SMB.</li>
                    <li>Database Management: Basic understanding of SQL databases like MySQL, PostgreSQL, or MSSQL.</li>
                </ul>
            </li>
            <li><strong>Software and Application Management</strong>:
                <ul>
                    <li>Web Servers: Configuring Apache, Nginx, IIS.</li>
                    <li>Mail Servers: Managing Postfix, Exchange, or similar systems.</li>
                    <li>Collaboration Tools: Setting up platforms like SharePoint, Slack, or Microsoft Teams.</li>
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
