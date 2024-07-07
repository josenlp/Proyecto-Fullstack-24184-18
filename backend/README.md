# Proyecto Backend Codo a Codo

Este proyecto es una API desarrollada con Flask.

## Estructura del Proyecto

```bash
mi_api/
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