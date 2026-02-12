# Around The U.S. - Galería de Lugares

Una aplicación web interactiva que permite a los usuarios explorar y compartir lugares icónicos de los Estados Unidos. Los usuarios pueden editar su perfil, agregar nuevas ubicaciones con imágenes, marcar sus lugares favoritos y ver detalles de las imágenes en una galería emergente.

## 📋 Descripción del Proyecto

**Around The U.S.** es una aplicación diseñada con JavaScript vanilla, HTML5 y CSS3. Permite gestionar una colección de tarjetas con imágenes de diferentes lugares, ofreciendo funcionalidades como:

- ✏️ Editar información del perfil (nombre y descripción)
- ➕ Agregar nuevas tarjetas de lugares con imagen y título
- ❤️ Marcar lugares como favoritos (like button)
- 🗑️ Eliminar tarjetas de la galería
- 🖼️ Ver imágenes en una galería emergente interactiva

## 🎯 Características

### Interfaz Responsiva
- Diseño responsive que se adapta a dispositivos móviles, tablets y desktops
- Utiliza CSS Grid y Flexbox para un layout moderno y flexible

### Gestión de Perfil
- Editar nombre y descripción del usuario
- Modal popup con formulario para edición de perfil

### Galería de Tarjetas
- Sistema de tarjetas predeterminadas con ubicaciones iniciales
- Funcionalidad para agregar nuevas tarjetas dinámicamente
- Opción de eliminar tarjetas
- Botón de likes para marcar favoritos

### Modales Interactivos
- Modal para editar perfil
- Modal para agregar nueva tarjeta
- Modal para visualizar imágenes en tamaño completo
- Cierre de modales con botón X o clic externo

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos responsivos con Grid y Flexbox
- **JavaScript Vanilla**: Lógica de la aplicación sin dependencias externas
- **Template HTML**: Uso de `<template>` para creación dinámica de elementos

## 📁 Estructura del Proyecto

```
web_project_around_es/
├── index.html              # Archivo principal HTML
├── README.md              # Este archivo
├── pages/
│   └── index.css          # Estilos compilados/importados
├── blocks/                # Componentes CSS BEM
│   ├── card.css
│   ├── cards.css
│   ├── content.css
│   ├── footer.css
│   ├── header.css
│   ├── page.css
│   ├── popup.css
│   └── profile.css
├── vendor/                # Dependencias de terceros
│   ├── normalize.css      # Reset CSS
│   ├── fonts.css          # Fuentes personalizadas
│   └── fonts/             # Archivos de fuentes
├── scripts/
│   └── index.js           # Lógica principal de JavaScript
└── images/                # Recursos gráficos
```

## 🎨 Estilo y Arquitectura

El proyecto sigue la metodología **BEM (Block Element Modifier)** para la estructura CSS:

- **Blocks**: `.profile`, `.cards`, `.card`, `.popup`, `.header`, `.footer`
- **Elements**: `.profile__title`, `.card__image`, `.popup__form`
- **Modifiers**: `.popup_is-opened`, `.card__like-button_is-active`

## 🚀 Cómo Usar

### 1. Clonar o descargar el proyecto

```bash
git clone <repository-url>
cd web_project_around_es
```

### 2. Abrir en el navegador

Simplemente abre el archivo `index.html` en tu navegador web preferido.

```bash
# En la mayoría de sistemas
open index.html

# O accede a través de un servidor local
python -m http.server 8000
```

### 3. Funcionalidades Principales

#### Editar Perfil
1. Haz clic en el botón de editar (lápiz) en la sección de perfil
2. Modifica tu nombre o descripción
3. Haz clic en "Guardar"

#### Agregar Nueva Tarjeta
1. Haz clic en el botón "+" en la sección de perfil
2. Completa el formulario con el título del lugar
3. Proporciona la URL de la imagen
4. Haz clic en "Crear"

#### Interactuar con Tarjetas
- **Dar Like**: Haz clic en el ícono de corazón
- **Ver Imagen Completa**: Haz clic en la imagen
- **Eliminar**: Haz clic en el ícono de papelera

## 📝 Documentación del Código

Las funciones principales están documentadas con comentarios JSDoc:

### Funciones Principales en `scripts/index.js`

- `openModal(modal)` - Abre un modal con animaciones
- `closeModal(modal)` - Cierra un modal
- `handleProfileFormSubmit(evt)` - Maneja actualización de perfil
- `handleAddCardFormSubmit(evt)` - Maneja creación de nueva tarjeta
- `getCardElement(data)` - Crea elemento de tarjeta con funcionalidades
- `renderCard(data, container)` - Renderiza tarjeta en el contenedor

## 🎯 Datos Iniciales

El proyecto incluye 6 ubicaciones iniciales predeterminadas:

1. Valle de Yosemite
2. Lago Louise
3. Montañas Calvas
4. Latemar
5. Parque Nacional de la Vanoise
6. Lago di Braies

Cada ubicación incluye una imagen y título, listos para ser explorados.

## 🔧 Características Técnicas

### JavaScript Dinámico
- Manipulación del DOM sin jQuery
- Event listeners para interacciones de usuario
- Template cloning para crear elementos reutilizables
- Prevención de comportamientos por defecto en formularios

### Validación
- Inputs requeridos en formularios
- Defaults para valores faltantes

### Accesibilidad
- Labels semánticos con `aria-label`
- Estructura HTML semántica
- Navegación clara con el teclado

## 📦 Fuentes Utilizadas

El proyecto utiliza la fuente **Inter** de Google Fonts, importada desde `vendor/fonts.css`.

## 🤝 Autor

**Luis Philco**

---

## 📄 Licencia

Este proyecto es parte del programa de Practicum by Yandex.

## 🔗 Enlaces Relacionados

- [Practicum by Yandex](https://practicum.yandex.com/)
- Este proyecto es una aplicación de práctica para desarrollar habilidades en desarrollo web frontend.

---

**Última actualización**: Febrero 2026
