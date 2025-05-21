"use strict"
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNav');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

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

    // Función para activar/desactivar modo oscuro
    const setDarkMode = (enabled) => {
      if (enabled) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️'; // Icono sol
      } else {
        body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙'; // Icono luna
      }
      localStorage.setItem('darkMode', enabled ? 'true' : 'false');
    };

    // Evento click toggle modo oscuro
    darkModeToggle.addEventListener('click', () => {
      const enabled = body.classList.contains('dark-mode');
      setDarkMode(!enabled);
    });

    // Al cargar, lee preferencia guardada
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
});
