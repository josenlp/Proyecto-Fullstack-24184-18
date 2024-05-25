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
  let slides = document.getElementsByClassName("imagen-slider-index");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.add('hide'); // Agrega la clase 'hide' a todas las imágenes
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  slides[slideIndex-1].classList.remove('hide'); // Elimina la clase 'hide' de la imagen actual
  dots[slideIndex-1].className += " active";
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

