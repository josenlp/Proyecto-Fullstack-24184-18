document.addEventListener('DOMContentLoaded', function() {
const urlParams = new URLSearchParams(window.location.search);
const contactoId = urlParams.get('id');

// Si no hay ID válido, regresar a la página anterior o mostrar un mensaje de error y cerrar ventana
if (!contactoId) {
    alert('No se ha proporcionado un ID válido.');
    window.close(); 
    return;
}

// Obtiene datos del contacto por su ID y los cargar en el formulario
fetch(`/api/contactos/${contactoId}`)
.then(response => response.json())
.then(data => {
    document.getElementById('contactoId').value = data.id;
    document.getElementById('nombre').value = data.nombre;
    document.getElementById('apellido').value = data.apellido;
    document.getElementById('email').value = data.email;
    document.getElementById('genero').value = data.genero;
    document.getElementById('pais').value = data.pais;
    document.getElementById('comentario').value = data.comentario;
})
.catch(error => {
    console.error('Error al cargar datos del contacto:', error);
    alert('Error al cargar datos del contacto. Por favor, intenta nuevamente.');
    window.close(); 
});

// envío del formulario para actualizar el contacto
document.getElementById('modificarContactoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch(`/api/contactos/${contactoId}`, { //modificar por el que corresponde
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Contacto actualizado correctamente.');
        window.close(); 
    })
    .catch(error => {
        console.error('Error al actualizar contacto:', error);
        alert('Error al actualizar contacto. Por favor, intenta nuevamente.');
    });
});
});