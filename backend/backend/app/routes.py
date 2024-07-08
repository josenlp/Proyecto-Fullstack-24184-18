from flask import current_app as app, jsonify, render_template, request, Blueprint
import sqlite3
from datetime import datetime

DATABASE = 'database/culturasma_db.sqlite'

main = Blueprint('main', __name__)

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/contactanos')
def contactanos():
    return render_template('contactanos.html')

@main.route('/eventos')
def eventos():
    return render_template('eventos.html')

@main.route('/lista_contactos')
def lista_contactos():
    return render_template('lista_contactos.html')

@main.route('/modificar-contacto')
def modificar_contacto():
    return render_template('modificar-contacto.html')

@main.route('/news')
def news():
    return render_template('news.html')

@main.route('/noticia_1')
def noticia_1():
    return render_template('noticia_1.html')

@main.route('/noticia_2')
def noticia_2():
    return render_template('noticia_2.html')

@main.route('/noticia_3')
def noticia_3():
    return render_template('noticia_3.html')

@main.route('/preguntas_frecuentes')
def preguntas_frecuentes():
    return render_template('preguntas_frecuentes.html')

@main.route('/quienes_somos')
def quienes_somos():
    return render_template('quienes_somos.html')

@main.route('/api/contactos', methods=['GET', 'POST'])
def contactos():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios")
        contactos = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in contactos])
    
    if request.method == 'POST':
        data = request.json        
        if not data:
            return jsonify({"error": "Formato JSON inválido"}), 400

        fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        nuevo_usuario = (
            data.get('nombre'),
            data.get('apellido'),
            data.get('email'),
            data.get('genero'),
            data.get('pais', data.get('otroPais', '')),
            data.get('comentario', '')
        )
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO usuarios (nombre, apellido, email, genero, pais, comentario, fecha)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (*nuevo_usuario, fecha))
        conn.commit()
        conn.close()

        return jsonify(data), 201

@main.route('/api/contactos/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def contacto_detalle(id):
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE id = ?", (id,))
        contacto = cursor.fetchone()
        conn.close()
        if contacto is None:
            return jsonify({"error": "Contacto no encontrado"}), 404
        return jsonify(dict(contacto))

    if request.method == 'PUT':
        data = request.form
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE usuarios
            SET nombre = ?, apellido = ?, email = ?, genero = ?, pais = ?, comentario = ?
            WHERE id = ?
        """, (data['nombre'], data['apellido'], data['email'], data['genero'], data['pais'], data.get('comentario', ''), id))
        conn.commit()
        conn.close()

        return jsonify({"message": "Contacto actualizado correctamente."}), 200
    
    if request.method == 'DELETE':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM usuarios WHERE id = ?", (id,))
        conn.commit()
        conn.close()
        return jsonify({"message": "Contacto eliminado correctamente."}), 200

@main.route('/api/ranking-paises')
def get_ranking_paises():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT pais, COUNT(*) AS cantidad
        FROM usuarios
        GROUP BY pais
        ORDER BY cantidad DESC
        LIMIT 5
    """)
    ranking = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in ranking])

@main.route('/api/totales')
def get_totales():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT genero, COUNT(*) as total FROM usuarios GROUP BY genero")
    totales_genero = cursor.fetchall()

    cursor.execute("SELECT COUNT(*) as total FROM usuarios")
    total_general = cursor.fetchone()[0]
    
    conn.close()

    totales = {row['genero']: row['total'] for row in totales_genero}
    totales['totalConsultas'] = total_general

    return jsonify(totales)
