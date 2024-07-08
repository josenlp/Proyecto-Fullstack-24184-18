# Proyecto Backend Codo a Codo

El proyecto incluye el deploy de una api en flask que gestiona los comentarios y consultas de los usuarios. Esta se encuentra dentro de la carpeta Backend. Este desarrollo se encuentra hosteado en [PythonAnywhere](https://culturasm.pythonanywhere.com/).

## Estructura del Proyecto

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

## Instalación

1. Clona el repositorio.
2. Navega a la carpeta `backend`.
3. Crea un entorno virtual e instala las dependencias:

```bash
virtualenv .env_api
./.env_api/Scripts/activate
pip install -r requirements.txt
```
4. Crea el archivo .env en la carpeta backend.
5. Inicia la aplicación:

```bash
python wsgi.py
```