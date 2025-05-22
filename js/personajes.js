const options = document.querySelectorAll(".option");
const mainView = document.getElementById("main-view");

// Variable para controlar el estado del video
let videoMode = false;
let activeOption = null;

// Función para mostrar el video
function showVideo(option) {
  if (videoMode) return; // Evitar múltiples activaciones
  
  videoMode = true;
  activeOption = option;
  
  // Agregar clases para mostrar el video
  option.classList.add("video-active");
  mainView.classList.add("video-mode");
  
  // Reproducir el video
  const video = option.querySelector('.hover-video');
  if (video) {
    video.play();
  }
}

// Función para ocultar el video
function hideVideo() {
  if (!videoMode || !activeOption) return;
  
  // Pausar el video
  const video = activeOption.querySelector('.hover-video');
  if (video) {
    video.pause();
  }
  
  // Remover clases
  activeOption.classList.remove("video-active");
  mainView.classList.remove("video-mode");
  
  // Resetear variables
  videoMode = false;
  activeOption = null;
}

// Event listeners para las opciones
options.forEach(option => {
  // Click para mostrar video
  option.addEventListener("click", (e) => {
    // Si ya estamos en modo video, no hacer nada (el botón de cerrar se encarga)
    if (videoMode && option.classList.contains("video-active")) {
      return;
    }
    
    // Si no estamos en modo video, mostrar el video
    if (!videoMode) {
      e.preventDefault();
      e.stopPropagation();
      showVideo(option);
      return;
    }
    
    // Si hacemos clic en una opción diferente mientras hay video activo
    if (videoMode && !option.classList.contains("video-active")) {
      hideVideo();
      setTimeout(() => {
        showVideo(option);
      }, 300);
      return;
    }
  });
});

// Event listener para cerrar video con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoMode) {
    hideVideo();
  }
});

// Event listener para el scroll spy y navbar
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('mainNav');

  new bootstrap.ScrollSpy(document.body, {
    target: '#mainNav',
    offset: parseInt(getComputedStyle(document.documentElement)
                     .getPropertyValue('--navbar-height'))
  });

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shrink');
    } else {
      navbar.classList.remove('shrink');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
});

// Crear y agregar botones de cerrar a cada opción
document.addEventListener('DOMContentLoaded', () => {
  options.forEach(option => {
    // Crear botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-video-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Cerrar video';
    
    // Event listener para cerrar video
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideVideo();
    });
    
    // Agregar el botón a la opción
    option.appendChild(closeBtn);
  });
});