const options = document.querySelectorAll(".option");
const mainView = document.getElementById("main-view");
const detailView = document.getElementById("detail-view");
const heroDetail = document.getElementById("hero-detail");
const backBtn = document.getElementById("back-btn");

const heroDescriptions = {
  blossom: {
    name: "Blossom",
    text: "Blossom is the smart and leader of the Powerpuff Girls. She's confident, analytical, and composed.",
    bg: "bg-blossom"
  },
  bubbles: {
    name: "Bubbles",
    text: "Bubbles is the sweet and bubbly one. She's playful, artistic, and loves animals.",
    bg: "bg-bubbles"
  },
  buttercup: {
    name: "Buttercup",
    text: "Buttercup is the tough and rebellious one. She's strong, fearless, and never backs down from a fight.",
    bg: "bg-buttercup"
  }
};

options.forEach(option => {
  option.addEventListener("click", () => {
    const hero = option.getAttribute("data-hero");
    const heroInfo = heroDescriptions[hero];

    option.classList.add("expand");

    setTimeout(() => {
      mainView.classList.add("d-none");
      option.classList.remove("expand");

      detailView.classList.remove("d-none");
      detailView.classList.add(heroInfo.bg);

      heroDetail.innerHTML = `
        <h1>${heroInfo.name}</h1>
        <p>${heroInfo.text}</p>
        <img src="${option.querySelector("img").src}" alt="${heroInfo.name}" class="hero-img mt-4"/>
      `;
    }, 500);
  });
});

backBtn.addEventListener("click", () => {
  detailView.classList.add("d-none");
  detailView.classList.remove("bg-blossom", "bg-bubbles", "bg-buttercup");
  mainView.classList.remove("d-none");
});

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
  
