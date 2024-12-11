document.addEventListener('DOMContentLoaded', () => {
    const petsSection = document.querySelector(".pets-section");

    const renderizarFavoritos = () => {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        petsSection.innerHTML = ""; // Limpa a seção antes de renderizar

        if (favoritos.length === 0) {
            petsSection.innerHTML = "<p>Você ainda não adicionou nenhum pet aos favoritos.</p>";
            return;
        }

        // biome-ignore lint/complexity/noForEach: <explanation>
        favoritos.forEach(favorito => {
            const petCard = document.createElement("div");
            petCard.className = "pet-card";

            petCard.innerHTML = `
                <img src="${favorito.image}" alt="${favorito.name}">
                <div class="card-content">
                    <h3>${favorito.name}</h3>
                    <p>Raça: ${favorito.race}</p>
                    <p>Descrição: ${favorito.description}</p>
                    <p>Idade: ${favorito.age} anos</p>
                    <p>Sexo: ${favorito.sex}</p>
                    <p>Finalidade: ${favorito.purpose}</p>
                </div>
                <div class="card-actions">
                    <button class="button-remove" onclick="removerFavorito('${favorito.image}')">Remover</button>
                </div>
            `;

            petsSection.appendChild(petCard);
        });
    };

    const removerFavorito = (petImage) => {
        console.log(`Tentando remover o pet com imagem: ${petImage}`);

        // Recupera os favoritos atuais
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // Filtra os pets, removendo o que corresponde à imagem
        const novosFavoritos = favoritos.filter(fav => fav.image !== petImage);

        if (novosFavoritos.length === favoritos.length) {
            console.warn("Pet não encontrado nos favoritos.");
            return;
        }

        // Atualiza o LocalStorage com a nova lista
        localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
        console.log("Favoritos atualizados no LocalStorage:", novosFavoritos);

        // Atualiza a interface
        renderizarFavoritos();

        alert("Pet removido dos favoritos!");
    };

    // Torna a função global para ser acessada pelo HTML
    window.removerFavorito = removerFavorito;

    // Renderiza a lista de favoritos ao carregar a página
    renderizarFavoritos();
});
