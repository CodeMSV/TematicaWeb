"use strict";

const options = document.querySelectorAll(".option");
const mainView = document.getElementById("main-view");

let videoMode = false;
let activeOption = null;

// Function to show the video and set the state
function showVideo(option) {
  if (videoMode) return;
  
  videoMode = true;
  activeOption = option;
  
  option.classList.add("video-active");
  mainView.classList.add("video-mode");
  
  const video = option.querySelector('.hover-video');
  if (video) {
    video.play();
  }
}

// Function to hide the video and reset the state
function hideVideo() {
  if (!videoMode || !activeOption) return;
  
  const video = activeOption.querySelector('.hover-video');
  if (video) {
    video.pause();
  }
  
  activeOption.classList.remove("video-active");
  mainView.classList.remove("video-mode");
  
  videoMode = false;
  activeOption = null;
}

// Add event listeners to each option
options.forEach(option => {
  option.addEventListener("click", (e) => {
    if (videoMode && option.classList.contains("video-active")) {
      return;
    }
    
    if (!videoMode) {
      e.preventDefault();
      e.stopPropagation();
      showVideo(option);
      return;
    }
    
    if (videoMode && !option.classList.contains("video-active")) {
      hideVideo();
      setTimeout(() => {
        showVideo(option);
      }, 300);
      return;
    }
  });
});

// Hide video when clicking outside of the option
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoMode) {
    hideVideo();
  }
});

// Hide video when clicking outside of the option
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

// Add close button to each option
document.addEventListener('DOMContentLoaded', () => {
  options.forEach(option => {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-video-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Cerrar video';
    
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideVideo();
    });
    
    option.appendChild(closeBtn);
  });
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  if (!darkModeToggle) {
    console.error('No se encontró el botón de modo oscuro');
    return;
  }

  const setDarkMode = (enabled) => {
    if (enabled) {
      body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
    } else {
      body.classList.remove('dark-mode');
      darkModeToggle.textContent = '🌙'; 
    }
    localStorage.setItem('darkMode', enabled ? 'true' : 'false');
  };

  // Check if dark mode is enabled in local storage
  darkModeToggle.addEventListener('click', () => {
    const enabled = body.classList.contains('dark-mode');
    setDarkMode(!enabled);
  });

  // Set initial dark mode state based on local storage
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    setDarkMode(true);
  }
});
