document.addEventListener("DOMContentLoaded", () => {
    // Navegação suave para os catálogos
    const catalogLinks = document.querySelectorAll("nav ul li a");

    catalogLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Ajusta para caber no topo da tela
                    behavior: "smooth"
                });
            }
        });
    });

    console.log("Script carregado com sucesso.");
});
