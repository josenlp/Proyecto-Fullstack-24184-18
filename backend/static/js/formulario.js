//Formulario//
// Para alternar la opción de agregar un país manualmente
function alternarEntradaPais(select) {
    // Obtiene el valor seleccionado
    var selectedValue = select.value;
    // Obtiene el campo de entrada para otro país
    var otroPaisInput = document.getElementById('otroPais');
    
    // Si la opción seleccionada es "Otro", muestra el campo de entrada
    if (selectedValue === 'otro') {
        otroPaisInput.style.display = 'block';
    } else {
        // De lo contrario, oculta el campo de entrada
        otroPaisInput.style.display = 'none';
    }
}

// Validación del formulario
const formRegister = document.getElementById("miFormulario");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEmail = document.getElementById("email");
const inputGeneroMasculino = document.getElementById("masculino");
const inputGeneroFemenino = document.getElementById("femenino");
const inputGeneroNobinario = document.getElementById("nobinario");
const inputGeneroOtro = document.getElementById("otroGenero");
const inputPais = document.getElementById("pais");
const inputOtroPais = document.getElementById("otroPais");
const inputTerminos = document.getElementById("terminos");
const parrafo = document.getElementById("error");

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    let warning = "";
    let valor = false;
    parrafo.innerHTML = "";
    
    // Obtener datos del formulario
    let formData = new FormData(formRegister);
    let data = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        genero: formData.get('genero'),
        pais: formData.get('pais') === 'otro' ? formData.get('otroPais') : formData.get('pais'),
        comentario: formData.get('comentario'),
        terminos: formData.get('terminos') === 'on'
    };

    // Enviar datos al servidor usando fetch
    fetch('/api/contactos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        }
        return response.json();
    })
    .then(data => {
        parrafo.innerHTML = 'Datos enviados correctamente';
        formRegister.reset(); // Limpiar formulario si se guardó correctamente
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        parrafo.innerHTML = 'Error al enviar los datos';
    });
});