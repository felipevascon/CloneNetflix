import { catalogos } from "./data.js";
import { createCarousel } from "./components/Carousel.js";

const perfil = localStorage.getItem("perfilSelecionado");
const categories = catalogos[perfil] || [];

document.addEventListener("DOMContentLoaded", () => {
    const nomePerfil = localStorage.getItem("perfilAtivoNome");
    const imagemPerfil = localStorage.getItem("perfilAtivoImagem");

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector(".kids-link");
        const profileIcon = document.querySelector(".profile-icon");

        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    const container = document.getElementById("main-content");

    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
    const temaSalvo = localStorage.getItem("theme");

    if (temaSalvo === "light") {
        document.body.classList.add("light-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLightMode = document.body.classList.toggle("light-mode");

            localStorage.setItem("theme", isLightMode ? "light" : "dark");

            if (themeIcon) {
                themeIcon.classList.toggle("fa-moon", !isLightMode);
                themeIcon.classList.toggle("fa-sun", isLightMode);
            }
        });
    }
});