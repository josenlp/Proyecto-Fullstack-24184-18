document.addEventListener("DOMContentLoaded", function() {
    cargarContactos();
    cargarRankingPaises();
    cargarTotales();
});

function cargarContactos() {
    fetch('http://localhost/tu-proyecto/consultar_contactos.php') // Reemplazar con la URL correcta
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

function cargarRankingPaises() {
    fetch('http://localhost/tu-proyecto/consultar_ranking_paises.php') // Reemplazar con la URL correcta
    .then(response => response.json())
    .then(data => {
        const rankingList = document.querySelector('#rankingList');
        rankingList.innerHTML = '';

        data.forEach(country => {
            let li = `<li>${country.name} - ${country.rating}</li>`;
            rankingList.innerHTML += li;
        });
    })
    .catch(error => {
        console.error('Error al cargar ranking de países:', error);
    });
}

function cargarTotales() {
    fetch('http://localhost/tu-proyecto/consultar_totales.php') // Reemplazar con la URL correcta
    .then(response => response.json())
    .then(data => {
        const totalsRow = document.querySelector('#totalsRow');
        totalsRow.innerHTML = '';

        let row = `
            <td>${data.totalConsultas}</td>
            <td>${data.totalMasculino}</td>
            <td>${data.totalFemenino}</td>
            <td>${data.totalOtro}</td>
        `;
        totalsRow.innerHTML = row;
    })
    .catch(error => {
        console.error('Error al cargar totales:', error);
    });
}

function eliminarContacto(id) {
    // Aquí puedes implementar la lógica para eliminar un contacto
    console.log(`Eliminando contacto con id ${id}`);
}
