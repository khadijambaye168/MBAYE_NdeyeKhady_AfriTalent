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