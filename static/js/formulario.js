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
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w{2,3})+$/;

    if (inputNombre.value.length < 3) {
        warning += `El nombre es corto<br>`;
        valor = true;
    }
    if (inputApellido.value.length < 2) {
        warning += `El apellido es corto<br>`;
        valor = true;
    }
    if (!regexEmail.test(inputEmail.value)) {
        warning += `El email no es válido<br>`;
        valor = true;
    }
    if (!inputGeneroMasculino.checked && !inputGeneroFemenino.checked && !inputGeneroNobinario.checked && !inputGeneroOtro.checked) {
        warning += `Debe seleccionar un género<br>`;
        valor = true;
    }
    if (inputPais.value === "default") {
        warning += `Elija una opción<br>`;
        valor = true;
    }
    if (inputPais.value === "otro" && inputOtroPais.value.trim() === "") {
        warning += `Ingrese el país<br>`;
        valor = true;
    }
    if (!inputTerminos.checked) {
        warning += `Debe aceptar los términos y condiciones<br>`;
        valor = true;
    }
    if (valor) {
        parrafo.innerHTML = warning;
    } else {
        parrafo.innerHTML = "Enviado";
        formRegister.reset();
    }
});
