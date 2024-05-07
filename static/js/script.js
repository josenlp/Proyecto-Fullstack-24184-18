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

// Para sumar la opcion de agregar un pais a mano
function toggleCountryInput(select) {
  // Obtiene el valor seleccionado
  var selectedValue = select.value;
  // Obtiene el campo de entrada para otro país
  var otherCountryInput = document.getElementById('otherCountry');
  
  // Si la opción seleccionada es "Otro", muestra el campo de entrada
  if (selectedValue === 'otro') {
      otherCountryInput.style.display = 'block';
  } else {
      // De lo contrario, oculta el campo de entrada
      otherCountryInput.style.display = 'none';
  }
}
