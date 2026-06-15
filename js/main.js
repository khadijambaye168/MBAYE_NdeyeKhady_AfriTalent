document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. GESTION DU DARK / LIGHT MODE
    // ==========================================
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    // Fonction pour appliquer le bon thème visuel
    const applyTheme = (theme) => {
        htmlElement.setAttribute("data-bs-theme", theme);
        
        if (theme === "dark") {
            themeIcon.className = "bi bi-moon-stars-fill";
            themeToggleBtn.classList.remove("text-white");
            themeToggleBtn.classList.add("text-warning");
        } else {
            themeIcon.className = "bi bi-sun-fill";
            themeToggleBtn.classList.remove("text-warning");
            themeToggleBtn.classList.add("text-white");
        }
    };

    // Charger le thème sauvegardé ou utiliser le thème clair par défaut
    const savedTheme = localStorage.getItem("afriTalent-theme") || "light";
    applyTheme(savedTheme);

    // Écouteur de clic sur le bouton switch
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            localStorage.setItem("afriTalent-theme", newTheme);
            applyTheme(newTheme);
        });
    }

    // ==========================================
    // 2. NAVBAR SCROLL (FOND, SHRINKS & OMBRE) & BTN RETOUR EN HAUT
    // ==========================================
    const navbar = document.querySelector(".custom-navbar");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        const scrollValue = window.scrollY;

        // Effets sur la Navbar (Se déclenchent après 50px de scroll)
        if (navbar) {
            if (scrollValue > 50) {
                navbar.classList.add("navbar-scrolled");
                navbar.classList.remove("navbar-dark", "bg-dark");
                // On passe en style clair/adaptatif lors du scroll
                navbar.classList.add("navbar-light");
            } else {
                navbar.classList.remove("navbar-scrolled", "navbar-light");
                navbar.classList.add("navbar-dark", "bg-dark");
            }
        }

        // Effet d'apparition du bouton Retour en Haut (Se déclenche après 300px)
        if (backToTopBtn) {
            if (scrollValue > 300) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    });

    // Action de retour fluide vers le haut
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. GESTION DU THÈME (DARK / LIGHT MODE)
    // ==========================================
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;

    // Fonction pour appliquer le thème et mettre à jour l'icône
    const setTheme = (theme) => {
        htmlElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            themeIcon.className = "bi bi-moon-stars-fill";
            // Ajustement optionnel : adapter la navbar en mode sombre complet
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark-custom");
        } else {
            themeIcon.className = "bi bi-sun-fill";
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark-custom");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark");
        }
    };

    // Récupération du thème sauvegardé ou détection des préférences système
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    
    // Application initiale au chargement
    setTheme(initialTheme);

    // Écouteur de clic sur le bouton de basculement
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
        });
    }

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT & BACK TO TOP
    // ==========================================
    const navbar = document.querySelector(".custom-navbar");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        // Effets sur la Navbar (fond, ombre, shrink)
        if (navbar) {
            if (scrollPos > 40) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        // Affichage/Masquage du bouton "Retour en haut"
        if (backToTopBtn) {
            if (scrollPos > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    });

    // Action de retour fluide vers le haut
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================
    // 3. ANIMATION DES COMPTEURS (SCROLL-ANIM)
    // ==========================================
    const counters = document.querySelectorAll(".counter");
    
    const animateCounter = (counterElement) => {
        const target = +counterElement.getAttribute("data-target");
        const duration = 2000; // Durée de l'animation en ms
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let currentCount = 0;

        // On réinitialise le texte avant de lancer pour éviter le flash visuel
        counterElement.innerText = "+0";

        const increment = target / (duration / stepTime);

        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= target) {
                counterElement.innerText = `+${target}`;
                clearInterval(timer);
            } else {
                counterElement.innerText = `+${Math.floor(currentCount)}`;
            }
        }, stepTime);
    };

    // Observer dédié pour capturer l'apparition des compteurs
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // L'animation ne s'exécute qu'une fois
            }
        });
    }, { threshold: 0.6 }); // Se déclenche quand 60% de l'élément est visible

    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================================
    // 4. FONDU DES SECTIONS (FADE-IN ANIMATION)
    // ==========================================
    // On cible les grandes sections de contenu de la page d'accueil
    const animatedSections = document.querySelectorAll(".hero-section, .stats-section, .bento-section, #services");

    // Ajout initial de la classe d'attente sur les éléments détectés
    animatedSections.forEach(section => section.classList.add("fade-in-section"));

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Persiste l'état une fois affiché
            }
        });
    }, { threshold: 0.15 }); // Déclenchement dès l'entrée de la bordure haute (15%)

    animatedSections.forEach(section => sectionObserver.observe(section));

    // ==========================================
    // 5. FILTRE DYNAMIQUE (PAGE FREELANCES)
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
                    // Petit effet de fondu lors de la réapparition des cartes filtrées
                    setTimeout(() => card.style.opacity = "1", 10);
                } else {
                    card.style.opacity = "0";
                    card.style.display = "none";
                }
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. GESTION DU THÈME PERSISTANT (DARK/LIGHT)
    // ==========================================
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;

    const setTheme = (theme) => {
        htmlElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            themeIcon.className = "bi bi-moon-stars-fill";
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark-custom");
        } else {
            themeIcon.className = "bi bi-sun-fill";
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark-custom");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark");
        }
    };

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            setTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }

    // ==========================================
    // 2. NAVBAR EFFETS & RETOUR EN HAUT
    // ==========================================
    const navbar = document.querySelector(".custom-navbar");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        if (navbar) {
            if (scrollPos > 40) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        if (backToTopBtn) {
            if (scrollPos > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================
    // 3. COMPTEURS ANIMÉS (IntersectionObserver)
    // ==========================================
    const counters = document.querySelectorAll(".counter");
    
    if (counters.length > 0) {
        const animateCounter = (counterElement) => {
            const target = parseInt(counterElement.getAttribute("data-target"), 10);
            const duration = 1600; // Durée de l'animation en millisecondes
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

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================
    // 4. FONDU DES SECTIONS (FADE-IN ANIMATION)
    // ==========================================
    const sectionsToAnimate = document.querySelectorAll(
        ".hero-section, .stats-section, .bento-section, #services, #statistiques, .style-section-white, main > section"
    );

    if (sectionsToAnimate.length > 0) {
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
});
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. GESTION DU THÈME PERSISTANT (DARK/LIGHT)
    // ==========================================
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;

    const setTheme = (theme) => {
        htmlElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            themeIcon.className = "bi bi-moon-stars-fill";
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark-custom");
        } else {
            themeIcon.className = "bi bi-sun-fill";
            document.querySelector(".custom-navbar")?.classList.remove("navbar-dark", "bg-dark-custom");
            document.querySelector(".custom-navbar")?.classList.add("navbar-dark", "bg-dark");
        }
    };

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            setTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }

    // ==========================================
    // 2. NAVBAR EFFETS & RETOUR EN HAUT
    // ==========================================
    const navbar = document.querySelector(".custom-navbar");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        if (navbar) {
            if (scrollPos > 40) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        if (backToTopBtn) {
            if (scrollPos > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================
    // 3. COMPTEURS ANIMÉS (IntersectionObserver)
    // ==========================================
    const counters = document.querySelectorAll(".counter");
    
    if (counters.length > 0) {
        const animateCounter = (counterElement) => {
            const target = parseInt(counterElement.getAttribute("data-target"), 10);
            const duration = 1600;
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

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================
    // 4. FONDU DES SECTIONS (FADE-IN ANIMATION)
    // ==========================================
    const sectionsToAnimate = document.querySelectorAll(
        ".hero-section, .stats-section, .bento-section, #services, #statistiques, .style-section-white, main > section, .main-content"
    );

    if (sectionsToAnimate.length > 0) {
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
    // 5. FILTRAGE DYNAMIQUE DES FREELANCES
    // ==========================================
    const filterSelect = document.getElementById("filtreCategorie");
    const freelanceCards = document.querySelectorAll(".freelance-card");

    if (filterSelect && freelanceCards.length > 0) {
        filterSelect.addEventListener("change", (e) => {
            const selectedCategory = e.target.value;

            freelanceCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (selectedCategory === "all" || cardCategory === selectedCategory) {
                    // Affiche la carte avec une transition fluide
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 10);
                } else {
                    // Masque la carte avec une transition fluide
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300); // Aligné sur la durée de transition CSS
                }
            });
        });
    }
});
// ==========================================
    // 6. VALIDATION FORMULAIRE DE CONTACT
    // ==========================================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");
        const successMessage = document.getElementById("successMessage");

        // RegEx pour valider une adresse email classique
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Fonction utilitaire pour afficher une erreur
        const showError = (inputElement, errorId) => {
            inputElement.classList.add("is-invalid-custom");
            const errorDiv = document.getElementById(errorId);
            if (errorDiv) errorDiv.style.display = "block";
        };

        // Fonction utilitaire pour masquer une erreur
        const hideError = (inputElement, errorId) => {
            inputElement.classList.remove("is-invalid-custom");
            const errorDiv = document.getElementById(errorId);
            if (errorDiv) errorDiv.style.display = "none";
        };

        // Fonction globale de vérification du formulaire
        const validateForm = () => {
            let isValid = true;

            // 1. Validation du Nom
            if (nom.value.trim() === "") {
                showError(nom, "error-nom");
                isValid = false;
            } else {
                hideError(nom, "error-nom");
            }

            // 2. Validation du Prénom
            if (prenom.value.trim() === "") {
                showError(prenom, "error-prenom");
                isValid = false;
            } else {
                hideError(prenom, "error-prenom");
            }

            // 3. Validation de l'Email
            if (!emailRegex.test(email.value.trim())) {
                showError(email, "error-email");
                isValid = false;
            } else {
                hideError(email, "error-email");
            }

            // 4. Validation du Sujet
            if (sujet.value === "") {
                showError(sujet, "error-sujet");
                isValid = false;
            } else {
                hideError(sujet, "error-sujet");
            }

            // 5. Validation du Message (Minimum 20 caractères)
            if (message.value.trim().length < 20) {
                showError(message, "error-message");
                isValid = false;
            } else {
                hideError(message, "error-message");
            }

            return isValid;
        };

        // Événement déclenché à la soumission du formulaire
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Empêche le rechargement de la page

            if (validateForm()) {
                // Si la validation passe, on affiche le bandeau de succès
                successMessage.classList.remove("d-none");
                contactForm.reset(); // Vide tous les champs du formulaire

                // Optionnel : Masque le message de succès automatiquement après 5 secondes
                setTimeout(() => {
                    successMessage.classList.add("d-none");
                }, 5000);
            } else {
                // Si échec, on s'assure que le message de succès reste masqué
                successMessage.classList.add("d-none");
            }
        });

        // Validation en temps réel (dès que l'utilisateur écrit ou change de champ)
        const inputs = [nom, prenom, email, sujet, message];
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                // Relance une vérification légère pour effacer l'erreur dès que la saisie devient correcte
                if (input === nom && nom.value.trim() !== "") hideError(nom, "error-nom");
                if (input === prenom && prenom.value.trim() !== "") hideError(prenom, "error-prenom");
                if (input === email && emailRegex.test(email.value.trim())) hideError(email, "error-email");
                if (input === sujet && sujet.value !== "") hideError(sujet, "error-sujet");
                if (input === message && message.value.trim().length >= 20) hideError(message, "error-message");
            });
        });
    }