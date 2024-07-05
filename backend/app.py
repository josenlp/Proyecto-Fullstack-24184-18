from flask import Flask, jsonify, render_template, request
import sqlite3
from datetime import datetime

app = Flask(__name__)

DATABASE = 'culturasma_db.sqlite'

# Función para conectar a la base de datos
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('lista_contactos.html')

@app.route('/formulario')
def formulario():
    return render_template('contactanos.html')

@app.route('/modificar-contacto.html')
def modificar_contacto():
    return render_template('modificar-contacto.html')

@app.route('/api/contactos', methods=['GET', 'POST'])
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


@app.route('/api/contactos/<int:id>', methods=['GET', 'PUT', 'DELETE'])
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

@app.route('/api/ranking-paises')
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

@app.route('/api/totales')
def get_totales():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Consulta para obtener el total de cada género
    cursor.execute("SELECT genero, COUNT(*) as total FROM usuarios GROUP BY genero")
    totales_genero = cursor.fetchall()

    # Consulta para obtener el total general de usuarios
    cursor.execute("SELECT COUNT(*) as total FROM usuarios")
    total_general = cursor.fetchone()[0]
    
    conn.close()

    # Formatear los resultados en un diccionario
    totales = {row['genero']: row['total'] for row in totales_genero}
    totales['totalConsultas'] = total_general
    
    print(totales)

    return jsonify(totales)

if __name__ == '__main__':
    app.run(debug=True)
