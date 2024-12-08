# 🌐 Personal Website - Rat-Labs Terminal

Este repositorio contiene el código fuente de mi página personal con estilo de terminal. Es una introducción a mi portafolio profesional, mostrando mis habilidades, experiencia, y proyectos en un diseño interactivo inspirado en un terminal moderno.

---

## 🚀 Tecnologías utilizadas

El proyecto está construido con las siguientes tecnologías y herramientas:

### **Frontend**
- **HTML5**: Para la estructura de la página.
- **CSS3**: Estilo y diseño, utilizando:
  - Animaciones CSS para efectos interactivos.
  - Diseño adaptable para una experiencia óptima en todos los dispositivos.
- **JavaScript**: Para la funcionalidad dinámica e interactiva, incluyendo:
  - Terminal interactiva.
  - Conmutador de idioma (Español/Inglés).
  - Comandos personalizados que muestran información.

### **Backend/Integraciones**
- **GitHub Pages**: Servicio de hosting para desplegar la página estática.
- **GitHub API**: Integración para listar automáticamente los repositorios públicos de GitHub en la sección de proyectos.

### **Gestión y configuración**
- **Jekyll**: Para la generación de páginas estáticas (opcional si usas configuraciones avanzadas de GitHub Pages).
- **Actions y Workflows de GitHub**: Automatización del despliegue a través de `actions/deploy-pages`.

---

## 🖥️ Funcionalidades principales

- **Diseño estilo terminal**: Inspirado en consolas retro con un toque moderno.
- **Soporte multilenguaje**: Español e Inglés, con un selector de idioma.
- **Terminal interactiva**:
  - Comandos disponibles:
    - `help`: Lista de comandos disponibles.
    - `about`: Muestra mi perfil profesional.
    - `experience`: Detalla mi experiencia laboral.
    - `skills`: Enumera mis habilidades técnicas.
    - `education`: Presenta mi formación académica.
    - `projects`: Lista automáticamente mis proyectos de GitHub.
    - `contact`: Muestra mis datos de contacto.
  - Comandos adicionales pueden ser configurados fácilmente.
- **Integración dinámica con GitHub**:
  - Muestra proyectos directamente desde mi perfil de GitHub mediante la API pública.

---

## ⚙️ Configuración del proyecto

### **Requisitos previos**
1. **Node.js** (opcional si quieres construir recursos estáticos avanzados).
2. **Git** instalado en tu máquina.

### **Pasos de instalación**
1. Clona este repositorio:
   ```bash
   git clone https://github.com/mratomo/personal-website.git
   cd personal-website
   ```
2. Si utilizas Jekyll para personalizaciones avanzadas:
   - Instala [Jekyll](https://jekyllrb.com/docs/installation/) y las dependencias del proyecto.
   ```bash
   bundle install
   ```

3. Abre el archivo `index.html` en tu navegador o utiliza un servidor local para previsualizar:
   ```bash
   npx http-server .
   ```

---

## 📦 Despliegue

El despliegue se realiza automáticamente en **GitHub Pages** mediante GitHub Actions. 

### **Flujo de despliegue**
1. Cada push a la rama `main` desencadena el workflow definido en `.github/workflows/deploy.yml`.
2. El contenido generado se publica en la URL configurada en **Settings > Pages** del repositorio.

---

## 🌟 Personalización

Para personalizar la página:
1. Modifica las secciones del terminal en `script.js` para incluir tus propios comandos y textos.
2. Cambia los estilos en `style.css` para ajustar el diseño a tus preferencias.
3. Configura los idiomas en el objeto `translations` dentro del archivo `script.js`.

---

## 🛠️ Herramientas adicionales

- **VS Code**: Editor recomendado para trabajar en este proyecto.
- **Postman**: Para probar la integración con la API de GitHub.

---

## 🧑‍💻 Autor

**Rat-Labs**  
[GitHub](https://github.com/mratomo) | [Correo](mailto:Operador_rata@pm.me)

---

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

Si necesitas más personalización o ajustes, házmelo saber. 😊
