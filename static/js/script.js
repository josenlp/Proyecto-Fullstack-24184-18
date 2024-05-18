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

