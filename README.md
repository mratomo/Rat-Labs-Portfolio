### 🐭 **Rat-Labs Portfolio** 🖥️

**Rat-Labs Portfolio** es una aplicación de terminal interactiva 🖱️ desarrollada en **Node.js** 🌐, con soporte para autenticación **OAuth con GitHub** 🔑. La app está diseñada para ofrecer una experiencia segura 🔒 y personalizable, con un despliegue fácil mediante **Docker** 🐳.

---

## ✨ **Características**

### 🎨 **Frontend**
- 🖥️ **Terminal interactiva**: 
- 🌍 **Multilenguaje**: Soporte para Español e Inglés.
- 💬 **Comandos disponibles**:
  - **`about`**: 📝 Información del perfil profesional.
  - **`experience`**: 💼 Experiencia laboral.
  - **`skills`**: 🛠️ Lista de habilidades técnicas.
  - **`education`**: 🎓 Formación académica.
  - **`projects`**: 📂 Proyectos públicos en GitHub. (Una vez autorizado el usuario por primera vez y editado el texto, recupera sus repos publicos automaticamente)
  - **`contact`**: 📧 Información de contacto.
  - **`help`**: 🆘 Ayuda con comandos disponibles.
  - **`admin`**: 🔐 Acceso al panel de administración. (comando oculto)
  - **`exit`**: 🚪 Limpia la consola.

### 🔒 **Backend**
- **OAuth con GitHub**:
  - 🚀 Autenticación segura mediante GitHub.
  - ✅ Verificación de usuario autorizado configurado.
- **Segunda capa de autenticación**:
  - Acceso administrativo protegido con contraseña.
- **Gestión de Contenidos**:
  - ✍️ Edición de los textos del portfolio desde el panel de administración.
  - 📁 Datos persistentes almacenados en `translations.json`.

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
- 🌍 Restricción de CORS para el frontend configurado.

---

## 🤝 **Contribuciones**
¡Se aceptan contribuciones! Abre un **issue** o un **pull request** en el repositorio. 


---

Si tienes alguna sugerencia, házmelo saber. 😊
