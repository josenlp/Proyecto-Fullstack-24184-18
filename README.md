<div align="center">
  <h1>Codo a Codo 2024 - Fullstack Python</h1>
  <h1>Trabajo Práctico: Desarrollo Web HTML, CSS y JavaScript</h1>
  <h2>Proyecto-Fullstack - Comisión 24184 - Grupo 18</h2>
</div>

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Contribuciones](#contribuciones)

## Descripción

Este proyecto proporciona una plataforma web para la promoción y difusión de eventos culturales y noticias relacionadas con la cultura en San Martín de los Andes. La página web permite a los usuarios encontrar información sobre eventos próximos, leer noticias culturales y obtener detalles sobre la comunidad cultural local. El proyecto frontend se encuentra funcionando en [netlify](https://culturasmdelosandes.netlify.app/) y el que tiene incluido el backend en [PythonAnywhere](https://culturasm.pythonanywhere.com/)
 
## Características

- **Listado de Eventos**: Información detallada sobre eventos culturales próximos en San Martín de los Andes.
- **Noticias Culturales**: Artículos y noticias relacionadas con la cultura local.
- **Formulario de Contacto**: Permite a los usuarios enviar consultas y comentarios.
- **Preguntas Frecuentes**: Sección con respuestas a las preguntas más comunes.
- **Diseño Responsivo**: Optimizado para dispositivos móviles y de escritorio.
- **Interactividad**: Validación de formularios y otras funcionalidades dinámicas usando JavaScript.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- Font Awesome

## Instalación

1. Clona el repositorio a tu máquina local:
```sh
git clone https://github.com/josenlp/Proyecto-Fullstack-24184-18.git
```

2. Navega al directorio del proyecto:
```sh
cd Proyecto-Fullstack-24184-18
```

## Uso para ver solo el frontend
Abre el archivo index.html en tu navegador web preferido.
```sh
open index.html
```

Esto cargará la página principal de la plataforma, donde podrás navegar por las diferentes secciones, como noticias, eventos, y más.
Asegúrate de estar conectado a internet para cargar los iconos de Font Awesome correctamente.

## Estructura del Proyecto (frontend)
```bash
nombre_del_repositorio/
│
├── static/
│   ├── css
│        ├── style.css              # Estilos CSS
│   ├── img/                         # Directorio de recursos de imagenes
│   ├── js/
│        ├── formulario.js          # Validación del formulario y funcionalidad JavaScript
│        ├── script.js              # Otras funcionalidades de JavaScript
│
│── templates/
│   ├── contactanos.html            # Página de contacto   
│   ├── eventos.html                # Página de eventos
│   ├── news.html                   # Página principal de noticias
│   ├── noticia_1.html              # Página de noticia 1
│   ├── noticia_2.html              # Página de noticia 2
│   ├── noticia_3.html              # Página de noticia 3
│   ├── preguntas_frecuentes.html   # Página de preguntas frecuentes
│   ├── quienes_somos.html          # Página quienes comos? 
│
├── index.html                      # Archivo principal de la pagina
├── README.md                       # Este archivo
```

# Backend

El proyecto incluye el deploy de una api en flask que gestiona los comentarios y consultas de los usuarios. Esta se encuentra dentro de la carpeta Backend. Este desarrollo se encuentra hosteado en [PythonAnywhere](https://culturasm.pythonanywhere.com/)

## Estructura del Proyecto (Backend incluido)
Dentro de la carpeta backend se encuentra la siguiente estructura.


```bash
backend/
├── backend/
│ ├── app/
│ │ ├── static/
│ │ │ ├── css/
│ │ │ └── js/
│ │ ├── templates/
│ │ ├── init.py
│ │ ├── routes.py
│ │ ├── models.py
│ ├── database/
│ │ └── culturasma_db.sqlite
│ ├── config.py
│ ├── wsgi.py
│ └── requirements.txt
└── README.md
```