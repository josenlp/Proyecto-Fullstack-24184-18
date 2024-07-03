from flask import Flask, jsonify, render_template, request
import csv
import os
from datetime import datetime

app = Flask(__name__)

CSV_FILE = 'contactos.csv'

# Crear el archivo CSV si no existe y agregar los encabezados
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['id', 'fecha', 'nombre', 'apellido', 'email', 'genero', 'pais', 'comentario', 'resuelto'])

@app.route('/')
def index():
    return render_template('lista_contactos.html')

@app.route('/formulario')
def formulario():
    return render_template('contactanos.html')

@app.route('/api/contactos', methods=['GET', 'POST'])
def contactos():
    if request.method == 'GET':
        contactos = []
        with open(CSV_FILE, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                contactos.append(row)
        return jsonify(contactos)
    
    if request.method == 'POST':
        data = request.json        
        if not data:
            return jsonify({"error": "Formato JSON inválido"}), 400
        new_id = 1
        with open(CSV_FILE, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                new_id += 1

        fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        with open(CSV_FILE, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([
                new_id, 
                fecha, 
                data.get('nombre'), 
                data.get('apellido'), 
                data.get('email'), 
                data.get('genero'), 
                data.get('pais', data.get('otroPais', '')), 
                data.get('comentario', ''), 
                False
            ])
        return jsonify(data), 201

@app.route('/api/ranking-paises')
def get_ranking_paises():
    ranking = "data.get_ranking_paises()"
    """
    SELECT pais, COUNT(*) AS cantidad
FROM usuarios
GROUP BY pais
ORDER BY cantidad DESC
LIMIT 5;
    """
    return jsonify(ranking)

@app.route('/api/totales')
def get_totales():
    total_consultas = 0
    total_mes = 0
    current_month = datetime.now().strftime('%Y-%m')
    with open(CSV_FILE, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            total_consultas += 1
            if row['fecha'].startswith(current_month):
                total_mes += 1
    
    totales = {
        "totalConsultas": total_consultas,
        "totalMes": total_mes
    }
    return jsonify(totales)

if __name__ == '__main__':
    app.run(debug=True)
