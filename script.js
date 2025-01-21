document.addEventListener("DOMContentLoaded", () => {
    // Menu toggle
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    menuButton.addEventListener("click", () => {
        menu.classList.toggle("hidden");
        if (!menu.classList.contains("hidden")) {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    });

    // Product visibility toggle
    const productContainers = document.querySelectorAll(".products-container");

    productContainers.forEach(container => {
        const products = container.querySelectorAll(".product");

        if (products.length > 10) {
            for (let i = 10; i < products.length; i++) {
                products[i].classList.add("hidden");
            }

            const viewMoreButton = document.createElement("button");
            viewMoreButton.textContent = "Ver Mais";
            viewMoreButton.classList.add("product-button");
            container.appendChild(viewMoreButton);

            viewMoreButton.style.display = "block";

            viewMoreButton.addEventListener("click", () => {
                products.forEach(product => product.classList.remove("hidden"));
                viewMoreButton.style.display = "none";
            });
        }
    });
});
