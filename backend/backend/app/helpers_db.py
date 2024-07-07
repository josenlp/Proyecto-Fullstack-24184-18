import sqlite3

nombre_db = 'culturasma_db.sqlite'

def get_usuarios():
    conn = sqlite3.connect(nombre_db)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios")
    filas = cursor.fetchall()

    for fila in filas:
        print(fila)

    cursor.close()
    conn.close()

def ranking_de_paises():
    conn = sqlite3.connect(nombre_db)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT pais, COUNT(*) as cantidad_usuarios
        FROM usuarios
        GROUP BY pais
        ORDER BY cantidad_usuarios DESC
    """)
    filas = cursor.fetchall()

    print("\nRanking de países:")
    for index, fila in enumerate(filas, start=1):
        pais, cantidad_usuarios = fila
        print(f"{index}. {pais}: {cantidad_usuarios} usuarios")

    cursor.close()
    conn.close()

def contar_generos():
    conn = sqlite3.connect(nombre_db)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT genero, COUNT(*) as cantidad
        FROM usuarios
        GROUP BY genero
    """)
    filas = cursor.fetchall()

    print("\nConteo de géneros:")
    for fila in filas:
        genero, cantidad = fila
        print(f"{genero}: {cantidad}")

    cursor.close()
    conn.close()

def cargar_usuario(nuevo_usuario):
    conn = sqlite3.connect(nombre_db)
    cursor = conn.cursor()

    # Insertar datos del nuevo usuario
    cursor.execute("""
        INSERT INTO usuarios (nombre, apellido, email, genero, pais, comentario)
        VALUES (?, ?, ?, ?, ?, ?)
    """, nuevo_usuario)

    # Confirmar los cambios
    conn.commit()

    print("Usuario cargado exitosamente.")

    cursor.close()
    conn.close()

def eliminar_usuario_por_id(id_usuario):
    conn = sqlite3.connect(nombre_db)
    cursor = conn.cursor()

    # Eliminar usuario por ID
    cursor.execute("DELETE FROM usuarios WHERE id = ?", (id_usuario,))

    # Confirmar los cambios
    conn.commit()

    if cursor.rowcount > 0:
        print(f"Usuario con ID {id_usuario} eliminado correctamente.")
    else:
        print(f"No se encontró ningún usuario con ID {id_usuario}.")

    cursor.close()
    conn.close()

def modificar_usuario_por_id(id_usuario, nuevos_datos):
    conn = sqlite3.connect(nombre_db)
    cursor = conn.cursor()

    # Modificar usuario por ID
    cursor.execute("""
        UPDATE usuarios
        SET nombre = ?,
            apellido = ?,
            email = ?,
            genero = ?,
            pais = ?,
            comentario = ?
        WHERE id = ?
    """, (*nuevos_datos, id_usuario))

    # Confirmar los cambios
    conn.commit()

    if cursor.rowcount > 0:
        print(f"Usuario con ID {id_usuario} modificado correctamente.")
    else:
        print(f"No se encontró ningún usuario con ID {id_usuario}.")

    cursor.close()
    conn.close()
