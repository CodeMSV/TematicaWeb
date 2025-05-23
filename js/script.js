"use strict"

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Reference the main navigation bar
    const navbar = document.getElementById('mainNav');
    // Reference the dark mode toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Initialize Bootstrap's ScrollSpy for active nav highlighting
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height')
      )
    });

    // Shrink navbar when page is scrolled past 50px
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Run once on load to set initial state

    // Function to enable or disable dark mode
    const setDarkMode = (enabled) => {
      if (enabled) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️'; // Sun icon
      } else {
        body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙'; // Moon icon
      }
      // Persist user preference
      localStorage.setItem('darkMode', enabled ? 'true' : 'false');
    };

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
      const enabled = body.classList.contains('dark-mode');
      setDarkMode(!enabled);
    });

    // On load, apply saved preference if available
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
});
