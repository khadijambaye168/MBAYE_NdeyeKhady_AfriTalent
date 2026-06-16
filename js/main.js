/**
 * ==========================================================================
 * AfriTalent - Scripts d'animations, de filtrage et de validation
 * Fichier unique regroupant toute la logique applicative du projet.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. GESTION DU THÈME PERSISTANT (DARK/LIGHT)
    // ==========================================
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;

    /**
     * Applique le thème sélectionné et configure les états visuels.
     * @param {string} theme - 'dark' ou 'light'
     */
    const setTheme = (theme) => {
        htmlElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            if (themeIcon) themeIcon.className = "bi bi-moon-stars-fill";
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark-custom");
        } else {
            if (themeIcon) themeIcon.className = "bi bi-sun-fill";
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark-custom");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark");
        }
    };

    // Chargement initial : priorité au stockage local, sinon détection des préférences système
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

    // Écouteur de clic pour le basculement dynamique
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            setTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }

    // ==========================================
    // 2. EFFETS NAVBAR AU SCROLL & RETOUR EN HAUT
    // ==========================================
    const navbar = document.querySelector(".custom-navbar");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        // Effet de réduction et d'ombrage de la Navbar
        if (navbar) {
            if (scrollPos > 40) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        // Apparition/Disparition du bouton de retour en haut
        if (backToTopBtn) {
            if (scrollPos > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    });

    // Animation fluide de remontée au clic
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================
    // 3. COMPTEURS ANIMÉS (INTERSECTION OBSERVER)
    // ==========================================
    const counters = document.querySelectorAll(".counter");

    if (counters.length > 0) {
        /**
         * Anime un compteur textuel de 0 jusqu'à sa cible définie.
         * @param {HTMLElement} counterElement - L'élément HTML portant l'attribut data-target
         */
        const animateCounter = (counterElement) => {
            const target = parseInt(counterElement.getAttribute("data-target"), 10);
            const duration = 1600; // Durée totale de l'effet en millisecondes
            const stepTime = Math.max(Math.floor(duration / target), 10);
            let currentCount = 0;
            const increment = target / (duration / stepTime);

            counterElement.innerText = "+0";

            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= target) {
                    counterElement.innerText = `+${target.toLocaleString()}`;
                    clearInterval(timer);
                } else {
                    counterElement.innerText = `+${Math.floor(currentCount).toLocaleString()}`;
                }
            }, stepTime);
        };

        // Déclenche l'animation uniquement lorsque la section devient visible à l'écran
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Coupe l'observation pour ne l'exécuter qu'une seule fois
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================
    // 4. ANIMATION DE FONDU AU DÉFILEMENT (FADE-IN)
    // ==========================================
    const sectionsToAnimate = document.querySelectorAll(
        ".hero-section, .stats-section, .bento-section, #services, #statistiques, .style-section-white, main > section, .main-content"
    );

    if (sectionsToAnimate.length > 0) {
        // Ajout immédiat de la classe d'attente CSS
        sectionsToAnimate.forEach(section => section.classList.add("fade-in-section"));

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sectionsToAnimate.forEach(section => sectionObserver.observe(section));
    }

    // ==========================================
    // 5. FILTRAGE DYNAMIQUE (PAGE FREELANCES)
    // ==========================================
    const filterSelect = document.getElementById("filtreCategorie");
    const freelanceCards = document.querySelectorAll(".freelance-card");

    if (filterSelect && freelanceCards.length > 0) {
        filterSelect.addEventListener("change", (e) => {
            const selectedCategory = e.target.value;

            freelanceCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (selectedCategory === "all" || cardCategory === selectedCategory) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 10);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300); // Raccordé sur le temps de transition CSS
                }
            });
        });
    }

    // ==========================================
    // 6. VALIDATION DU FORMULAIRE DE CONTACT
    // ==========================================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");
        const successMessage = document.getElementById("successMessage");

        // Expression régulière normalisée pour le contrôle syntaxique de l'adresse email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        /**
         * Injecte visuellement les styles d'erreur sur un champ de saisie invalide.
         */
        const showError = (inputElement, errorId) => {
            inputElement.classList.add("is-invalid-custom");
            const errorDiv = document.getElementById(errorId);
            if (errorDiv) errorDiv.classList.remove("d-none");
        };

        /**
         * Nettoie les styles d'erreur dès que la saisie redevient valide.
         */
        const hideError = (inputElement, errorId) => {
            inputElement.classList.remove("is-invalid-custom");
            const errorDiv = document.getElementById(errorId);
            if (errorDiv) errorDiv.classList.add("d-none");
        };

        /**
         * Effectue la vérification pas à pas de l'intégralité du formulaire de contact.
         * @returns {boolean} isValid - Vrai si tous les champs passent les critères requis
         */
        const validateForm = () => {
            let isValid = true;

            // Contrôle du Nom
            if (nom && nom.value.trim() === "") {
                showError(nom, "error-nom");
                isValid = false;
            } else if (nom) {
                hideError(nom, "error-nom");
            }

            // Contrôle du Prénom
            if (prenom && prenom.value.trim() === "") {
                showError(prenom, "error-prenom");
                isValid = false;
            } else if (prenom) {
                hideError(prenom, "error-prenom");
            }

            // Contrôle syntaxique de l'adresse de messagerie
            if (email && !emailRegex.test(email.value.trim())) {
                showError(email, "error-email");
                isValid = false;
            } else if (email) {
                hideError(email, "error-email");
            }

            // Contrôle de sélection du Sujet
            if (sujet && sujet.value === "") {
                showError(sujet, "error-sujet");
                isValid = false;
            } else if (sujet) {
                hideError(sujet, "error-sujet");
            }

            // Contrôle de longueur du Message (Exigence métier : minimum 20 caractères)
            if (message && message.value.trim().length < 20) {
                showError(message, "error-message");
                isValid = false;
            } else if (message) {
                hideError(message, "error-message");
            }

            return isValid;
        };

        // Surveillance de l'événement de soumission
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Bloque la soumission par défaut (éviter la recharge de la page)

            if (validateForm()) {
                if (successMessage) successMessage.classList.remove("d-none");
                contactForm.reset(); // Purge les valeurs des champs après validation réussie

                // Dissimulation automatique du message de confirmation après 5 secondes
                setTimeout(() => {
                    if (successMessage) successMessage.classList.add("d-none");
                }, 5000);
            } else {
                if (successMessage) successMessage.classList.add("d-none");
            }
        });

        // Validation dynamique adaptative (Temps réel au fur et à mesure de l'écriture)
        const inputs = [nom, prenom, email, sujet, message];
        inputs.forEach(input => {
            if (input) {
                input.addEventListener("input", () => {
                    if (input === nom && nom.value.trim() !== "") hideError(nom, "error-nom");
                    if (input === prenom && prenom.value.trim() !== "") hideError(prenom, "error-prenom");
                    if (input === email && emailRegex.test(email.value.trim())) hideError(email, "error-email");
                    if (input === sujet && sujet.value !== "") hideError(sujet, "error-sujet");
                    if (input === message && message.value.trim().length >= 20) hideError(message, "error-message");
                });
            }
        });
    }
}); // Fin globale du script DOMContentLoaded