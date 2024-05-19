//Eventos carrousel//
let slideIndex = 1;
showSlides(slideIndex);

// Controles de siguiente y anterior
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Controles de paso de imagen
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("imagen-slider");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

//Formulario//
// Para sumar la opcion de agregar un pais a mano
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

// Validacion del formulario
const formRegister=document.getElementById("miFormulario")
const inputNombre=document.getElementById("nombre");
const inputApellido=document.getElementById("apellido");
const inputEmail=document.getElementById("email");
const inputPais=document.getElementById("pais");
const inputOtroPais = document.getElementById("otroPais");
const parrafo=document.getElementById("error");

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
        warning += `El email no es valido<br>`;
        valor = true;
    }
    if (inputPais.value === "default") {
        warning += `Elija una opcion <br>`;
        valor = true;
    }
    if (inputPais.value === "otro" && inputOtroPais.value.trim() === "") {
        warning += `Ingrese el país<br>`;
        valor = true;
    }
    if (valor) {
        parrafo.innerHTML = warning;
    } else {
        parrafo.innerHTML = "Enviado";
        formRegister.reset();
    }
});

//ultimas Noticias carrousel//
document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide-open');
    const totalSlides = slides.length;

    setInterval(() => {
        slides[currentIndex].checked = false;
        currentIndex = (currentIndex + 1) % totalSlides;
        slides[currentIndex].checked = true;
    }, 4000);
});

//barra buscadora//
function searchFiles() {
  var searchText = document.getElementById("searchInput").value.toLowerCase();
  var elements = document.getElementsByTagName("*");

  var searchResults = [];

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.nodeType === 3) { 
          var text = element.textContent.toLowerCase();
          if (text.includes(searchText)) {
              searchResults.push(element.parentNode);
          }
      }
  }

  var searchResultsContainer = document.getElementById("searchResults");
  searchResultsContainer.innerHTML = "";

  if (searchResults.length > 0) {
      searchResults.forEach(function(result) {
          var resultItem = document.createElement("div");
          resultItem.textContent = result.textContent;
          searchResultsContainer.appendChild(resultItem);
      });
  } else {
      searchResultsContainer.textContent = "No se encontraron resultados.";
  }
}

