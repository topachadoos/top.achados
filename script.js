document.addEventListener("DOMContentLoaded", () => {
            const productsContainer = document.getElementById("products-container");
            const addProductButton = document.getElementById("add-product");
            const adminButton = document.getElementById("admin-mode");

            const verifyAdminPassword = () => {
                const password = prompt("Digite a senha de administrador:");
                return password === "37999948805K";
            };

            let isAdmin = false;

            const toggleAdminMode = () => {
                if (verifyAdminPassword()) {
                    isAdmin = true;
                    document.body.classList.add("admin-mode");
                    addProductButton.style.display = "block";
                    alert("Modo Admin ativado!");
                } else {
                    alert("Senha incorreta! Você não tem permissão para acessar as funções de administrador.");
                }
            };

            adminButton.addEventListener("click", toggleAdminMode);

            addProductButton.style.display = "none";
            addProductButton.addEventListener("click", () => {
                if (!isAdmin) {
                    alert("Você não tem permissão para adicionar produtos.");
                    return;
                }
                addNewProduct();
            });

            const addNewProduct = () => {
                if (!isAdmin) {
                    alert("Você não tem permissão para adicionar produtos.");
                    return;
                }

                const form = document.createElement("div");
                form.innerHTML = `
                    <input type="text" id="product-name" placeholder="Nome do produto">
                    <input type="text" id="product-price" placeholder="Preço do produto">
                    <input type="text" id="product-link" placeholder="Link de compra">
                    <input type="text" id="product-image" placeholder="URL da imagem">
                    <button id="submit-product">Salvar</button>
                `;

                document.body.appendChild(form);

                document.getElementById("submit-product").addEventListener("click", () => {
                    const name = document.getElementById("product-name").value;
                    const price = document.getElementById("product-price").value;
                    const link = document.getElementById("product-link").value;
                    const imageUrl = document.getElementById("product-image").value;

                    if (name && price && link && imageUrl) {
                        const product = { name, price, link, imageUrl };
                        const productCard = createProductCard(name, price, link, imageUrl);
                        productsContainer.appendChild(productCard);
                        saveProduct(product);
                        document.body.removeChild(form);
                    } else {
                        alert("Todos os campos são obrigatórios.");
                    }
                });
            };

            const saveProduct = (product) => {
                const products = JSON.parse(localStorage.getItem("products")) || [];
                products.push(product);
                localStorage.setItem("products", JSON.stringify(products));
            };

            const loadProducts = () => {
                const products = JSON.parse(localStorage.getItem("products")) || [];
                products.forEach(product => {
                    const productCard = createProductCard(product.name, product.price, product.link, product.imageUrl);
                    productsContainer.appendChild(productCard);
                });
            };

            const createProductCard = (name, price, link, imageUrl) => {
                const productCard = document.createElement("div");
                productCard.classList.add("product");
                productCard.innerHTML = `
                    <img src="${imageUrl}" alt="${name}" class="product-image">
                    <h3>${name}</h3>
                    <p>Preço: R$${price}</p>
                    <button class="buy-button" onclick="window.open('${link}', '_blank')">Comprar</button>
                    <div class="admin-controls" style="display: none;">
                        <button class="edit-product">Editar</button>
                        <button class="remove-product">Remover</button>
                    </div>
                `;

                const adminControls = productCard.querySelector(".admin-controls");
                productCard.querySelector(".edit-product").addEventListener("click", () => editProduct(name));
                productCard.querySelector(".remove-product").addEventListener("click", () => removeProduct(name));

                if (isAdmin) {
                    adminControls.style.display = "block";
                }

                return productCard;
            };

            const editProduct = (productName) => {
                if (!isAdmin) {
                    alert("Você não tem permissão para editar produtos.");
                    return;
                }

                const products = JSON.parse(localStorage.getItem("products")) || [];
                const product = products.find(p => p.name === productName);

                if (!product) {
                    alert("Produto não encontrado.");
                    return;
                }

                const newName = prompt("Novo nome do produto:", product.name);
                const newPrice = prompt("Novo preço do produto:", product.price);
                const newLink = prompt("Novo link de compra do produto:", product.link);
                const newImageUrl = prompt("Novo URL da imagem do produto:", product.imageUrl);

                if (newName && newPrice && newLink && newImageUrl) {
                    product.name = newName;
                    product.price = newPrice;
                    product.link = newLink;
                    product.imageUrl = newImageUrl;

                    updateProducts(products);
                    productsContainer.innerHTML = "";
                    loadProducts();
                } else {
                    alert("Todos os campos são obrigatórios.");
                }
            };

            const removeProduct = (productName) => {
                if (!isAdmin) {
                    alert("Você não tem permissão para remover produtos.");
                    return;
                }

                const products = JSON.parse(localStorage.getItem("products")) || [];
                const updatedProducts = products.filter(p => p.name !== productName);

                updateProducts(updatedProducts);
                productsContainer.innerHTML = "";
                loadProducts();
            };

            const updateProducts = (products) => {
                localStorage.setItem("products", JSON.stringify(products));
            };

            loadProducts();
        });
        const createProductCard = (name, price, link, imageUrl) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
                <img src="${imageUrl}" alt="${name}" class="product-image">
                <h3>${name}</h3>
                <p>Preço: R$${price}</p>
                <a href="${link}" target="_blank" class="product-link">Comprar</a>
                <div class="admin-controls" style="display: none;">
                    <button class="edit-product">Editar</button>
                    <button class="remove-product">Remover</button>
                </div>
            `;
        
            const adminControls = productCard.querySelector(".admin-controls");
            productCard.querySelector(".edit-product").addEventListener("click", () => editProduct(name));
            productCard.querySelector(".remove-product").addEventListener("click", () => removeProduct(name));
        
            if (isAdmin) {
                adminControls.style.display = "block";
            }
        
            return productCard;
        };
        