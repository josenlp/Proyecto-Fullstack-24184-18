document.addEventListener("DOMContentLoaded", function() {
    cargarContactos();
    cargarRankingPaises();
    cargarTotales();
});

function cargarContactos() {
    fetch('/api/contactos') // Reemplazar con la URL correcta
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('#contactosTable tbody');
        tbody.innerHTML = '';

        data.forEach(contacto => {
            let row = `
                <tr>
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.apellido}</td>
                    <td>${contacto.email}</td>
                    <td>${contacto.genero}</td>
                    <td>${contacto.pais}</td>
                    <td>${contacto.comentario}</td>
                    <td>
                        <button onclick="eliminarContacto(${contacto.id})">Modificar</button>
                        <button onclick="eliminarContacto(${contacto.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    })
    .catch(error => {
        console.error('Error al cargar contactos:', error);
    });
}
document.getElementById('btnAgregar').addEventListener('click', function() {
    window.location.href = '../../templates/contactanos.html';
});

function cargarRankingPaises() {
    fetch('/api/ranking-paises') // Reemplazar con la URL correcta
    .then(response => response.json())
    .then(data => {
        const rankingList = document.querySelector('#rankingList');
        rankingList.innerHTML = '';

        data.forEach(country => {
            let li = `<li>${country.pais} - ${country.cantidad}</li>`;
            rankingList.innerHTML += li;
        });
    })
    .catch(error => {
        console.error('Error al cargar ranking de países:', error);
    });
}

function cargarTotales() {
    fetch('/api/totales') // Reemplazar con la URL correcta
    .then(response => response.json())
    .then(data => {
        const totalsRow = document.querySelector('#totalsRow');
        totalsRow.innerHTML = '';

        let row = `
            <td>${data.totalConsultas}</td>
            <td>${data.masculino}</td>
            <td>${data.femenino}</td>
            <td>${data.nobinario}</td>
            <td>${data.otro}</td>
        `;
        totalsRow.innerHTML = row;
    })
    .catch(error => {
        console.error('Error al cargar totales:', error);
    });
}

function eliminarContacto(id) {
    fetch(`/api/contactos/${id}`, {// reemplazar con el correcto
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(`Contacto con id ${id} eliminado`);
            const tbody = document.querySelector('#contactosTable tbody');
            const tr = tbody.querySelector(`tr[data-id="${id}"]`);
            if (tr) {
                tbody.removeChild(tr);
            } else {
                console.warn(`No se encontró el contacto con id ${id} en la interfaz.`);
            }
        })
    .catch(error => {
        console.error('Error al eliminar contacto:', error);
    });
}
function modificarContacto(id) {
    console.log(`Modificando contacto con id ${id}`);
    window.location.href = `/templates/modificar-contacto.html?id=${id}`;
}

