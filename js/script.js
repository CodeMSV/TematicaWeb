"use strict"
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
  