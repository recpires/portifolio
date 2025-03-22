// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Animação do Título (Efeito de Digitação)
  const titleElement = document.getElementById("main-title");
  const titleText = "Rodrigo Pires"; // O texto a ser digitado
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < titleText.length) {
      titleElement.innerHTML += titleText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100); // Velocidade da digitação (ms)
    } else {
      // Adiciona o cursor piscante após a digitação
      titleElement.style.borderRight = "2px solid var(--cor-terciaria)";
      titleElement.style.animation = "blink-caret 0.75s step-end infinite";
    }
  }

  // Adiciona um keyframe para a animação das estrelas no CSS (melhor performance) e a animação title
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
     #main-title {
        overflow: hidden;       /* Garante que o conteúdo seja cortado */
        border-right: .15em solid var(--cor-terciaria); /* Cursor de digitação */
        white-space: nowrap;      /* Mantém o texto em uma única linha */
        margin: 0 auto;        /* Centraliza o texto (opcional) */
        letter-spacing: .10em; /* Espaçamento entre letras (opcional) */
        animation:
        typing 3.5s steps(40, end), /* Duração e número de passos */
        blink-caret .75s step-end infinite;
       }

        .star {
             position: absolute;
             background-color: white;
             border-radius: 50%;
             animation: move-stars linear infinite;
             opacity: ${Math.random()}; /* Varia a opacidade */
         }

         @keyframes move-stars {
             from { transform: translateY(0); }
             to { transform: translateY(-200vh); }  /* Move para cima, fora da tela */
         }

         /* The typing effect */
        @keyframes typing {
        from { width: 0 }
        to { width: 100% }
        }

        /* The typewriter cursor effect */
        @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: var(--cor-terciaria); }
        }
     `;
  document.head.appendChild(styleSheet);

  typeWriter(); // Inicia a animação de digitação

  // Animação do Fundo Estrelado
  const starsContainer = document.getElementById("stars-container");
  const numStars = 250; // Aumentei o número de estrelas

  function createStars() {
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${5 + Math.random() * 10}s`;

      const size = `${2 + Math.random() * 3}px`;
      star.style.width = size;
      star.style.height = size;
      star.style.backgroundColor = `hsl(200, 100%, ${
        50 + Math.random() * 50
      }%)`;
      starsContainer.appendChild(star);
    }
  }

  createStars(); // Chama a função para criar as estrelas
});

// Lógica para o carrossel de artigos
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

let currentIndex = 0;

function updateCarousel(position) {
  track.style.transform = `translateX(${position}px)`;
}

function moveToSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  currentIndex = (index + slides.length) % slides.length; // Loop infinito
  const newPosition = -currentIndex * (slideWidth + 20); // Inclui margem
  updateCarousel(newPosition);
}

nextButton.addEventListener("click", () => {
  moveToSlide(currentIndex + 1);
});

prevButton.addEventListener("click", () => {
  moveToSlide(currentIndex - 1);
});

// Ajusta o tamanho do track dinamicamente
function setSlidePositions() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.width = `${(slideWidth + 20) * slides.length}px`; // Inclui margem
}

window.addEventListener("resize", setSlidePositions);
setSlidePositions();
