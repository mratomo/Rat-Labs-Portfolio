
# 🐭 **Rat-Labs Portfolio** 🖥️

**Rat-Labs Portfolio** es una web que emula un terminal de forma interactiva 🖱️ desarrollada en **Node.js** 🌐, con soporte para autenticación **OAuth con GitHub** 🔑. La app está diseñada para ofrecer una experiencia segura 🔒 y personalizable, con un despliegue fácil mediante **Docker** 🐳.

---

## ✨ **Características**

### 🎨 **Frontend**
- 🖥️ **Terminal interactiva** 
- 🌍 **Multilenguaje**: Soporte para Español e Inglés.
- 💬 **Comandos disponibles**:
  - **`about`**: 📝 Información del perfil profesional.
  - **`experience`**: 💼 Experiencia laboral.
  - **`skills`**: 🛠️ Lista de habilidades técnicas.
  - **`education`**: 🎓 Formación académica.
  - **`projects`**: 📂 Proyectos públicos en GitHub (recupera automáticamente los repositorios públicos del usuario autorizado).
  - **`contact`**: 📧 Información de contacto.
  - **`help`**: 🆘 Ayuda con comandos disponibles.
  - **`admin`**: 🔐 Acceso al panel de administración (comando oculto).
  - **`exit`**: 🚪 Limpia la consola.

### 🔒 **Backend**
- **OAuth con GitHub**:
  - 🚀 Autenticación segura mediante GitHub.
  - ✅ Verificación de usuario autorizado configurado.
- **Segunda capa de autenticación**:
  - Acceso administrativo protegido con contraseña.
- **Gestión de Contenidos**:
  - ✍️ Edición de los textos del portfolio desde el panel de administración con soporte para Markdown:
  - 📁 Datos persistentes almacenados en `translations.json`.
  
```json 
  {
"es": {
"about": "## Perfil Profesional\nCompleta aquí tu información sobre el perfil profesional en formato Markdown.",
"experience": "## Experiencia Laboral\nCompleta aquí tu información sobre experiencia laboral en formato Markdown.",
"skills": "## Habilidades Técnicas\nCompleta aquí tu información sobre habilidades técnicas en formato Markdown.",
"education": "## Formación Académica\nCompleta aquí tu información sobre la formación académica en formato Markdown.",
"contact": "## Contacto\nCompleta aquí tu información de contacto en formato Markdown."
},
"en": {
"about": "## Professional Profile\nComplete your information about the professional profile in Markdown format.",
"experience": "## Work Experience\nComplete your information about work experience in Markdown format.",
"skills": "## Technical Skills\nComplete your information about technical skills in Markdown format.",
"education": "## Education\nComplete your information about education in Markdown format.",
"contact": "## Contact Information\nComplete your contact information in Markdown format."
}
}
```


---

## 🛡️ **Seguridad**
1. 🔐 **Protección de Sesión**: Cookies `httpOnly` protegidas con `SESSION_SECRET`.
2. ✅ **Validación de Usuarios**: Solo usuarios configurados en `AUTHORIZED_GITHUB_USERNAME` pueden acceder al panel.
3. 🌍 **CORS**: Solo solicitudes desde el frontend autorizado son aceptadas.

---

## ⚙️ **Requisitos**

1. **Software necesario**:
   - 🐳 [Docker](https://www.docker.com/).
   - 🌐 Node.js (solo para desarrollo local).

2. **Variables de entorno**:
   Configura las siguientes variables de entorno antes de iniciar la aplicación:

   ```env
   GITHUB_CLIENT_ID=tu_cliente_id
   GITHUB_CLIENT_SECRET=tu_cliente_secreto
   ADMIN_PASSWORD=tu_contraseña_admin
   SESSION_SECRET=tu_secreto_de_sesion
   REDIRECT_URI=https://tu-dominio.com/oauth/callback
   AUTHORIZED_GITHUB_USERNAME=tu_usuario_github
   ```

- **`GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET`**: Se obtienen al registrar la aplicación en [GitHub Developers](https://github.com/settings/developers).
- **`REDIRECT_URI`**: URI configurada en la app de GitHub para manejar el callback de OAuth.
- **`AUTHORIZED_GITHUB_USERNAME`**: Usuario autorizado para acceder al panel administrativo.

---

## 🐳 **Instrucciones de Despliegue con Docker**

### **1. Construcción de la Imagen Docker**
Ejecuta este comando para construir la imagen:

```bash
docker build -t portfolio:latest .
```

### **2. Lanzar el Contenedor**
Ejecuta el contenedor pasando las variables de entorno como argumentos:

```bash
docker run -d \
    -e GITHUB_CLIENT_ID=tu_cliente_id \
    -e GITHUB_CLIENT_SECRET=tu_cliente_secreto \
    -e ADMIN_PASSWORD=tu_contraseña_admin \
    -e SESSION_SECRET=tu_secreto_de_sesion \
    -e REDIRECT_URI=https://tu-dominio.com/oauth/callback \
    -e AUTHORIZED_GITHUB_USERNAME=tu_usuario_github \
    -p 3000:3000 \
    portfolio:latest
```

---

## 🔧 **Desarrollo Local**

1. **Instala dependencias**:

   ```bash
   npm install
   ```

2. **Configura variables en `.env`.**

3. **Inicia la aplicación**:

   ```bash
   npm start
   ```

4. **Accede** a [http://localhost:3000](http://localhost:3000).

---

## ✍️ **Configuración de OAuth en GitHub**

1. Ve a [GitHub Developers Settings](https://github.com/settings/developers).
2. Crea una nueva aplicación OAuth:
    - **Nombre**: Nombre de tu proyecto.
    - **Homepage URL**: `https://tu-dominio.com` (o la URL donde se desplegará).
    - **Authorization callback URL**: `https://tu-dominio.com/oauth/callback`.

3. Guarda el **Client ID** y **Client Secret**, y configúralos como variables de entorno.

---

## 🛡️ **Seguridad Implementada**
- 🚦 Redirección segura con `REDIRECT_URI`.
- 🔐 Validación estricta de usuarios autorizados.
- 🍪 Sesiones protegidas con cookies seguras.

---

## ✨ **Novedades Implementadas**
1. **Renderizado Markdown Dinámico:**
    - El contenido del portfolio, como el perfil profesional, experiencia, habilidades, formación, y contacto, se carga desde un archivo JSON con soporte para Markdown.
    - El frontend utiliza `Marked.js` para procesar y renderizar Markdown con un diseño consistente.

2. **Integración del Comando `projects`:**
    - Recupera automáticamente los repositorios públicos del usuario autenticado en GitHub.

---

## 🤝 **Contribuciones**
¡Se aceptan contribuciones! Abre un **issue** o un **pull request** en el repositorio.

Si tienes alguna sugerencia, no dudes en contactar. 😊
```

