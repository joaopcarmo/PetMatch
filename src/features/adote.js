document.addEventListener('DOMContentLoaded', () => {
    const renderizarPetsAdocao = () => {
        const petsSection = document.getElementById("pets-section");

        // Pets fictícios pré-existentes
        const petsFicticios = [
            {
                name: "Bolinha",
                race: "Vira-Lata",
                description: "Adora crianças e passeios no parque.",
                age: "3",
                purpose: "adocao",
                image: "../imgs/bolinha.jpg" // Certifique-se de que a imagem exista
            },
            {
                name: "Luna",
                race: "Golden Retriever",
                description: "Muito dócil e adora correr.",
                age: "2",
                purpose: "adocao",
                image: "../imgs/luna.jpg"
            }
        ];

        // Pets cadastrados no LocalStorage com a finalidade "Adoção"
        const petsCadastrados = JSON.parse(localStorage.getItem("pets")) || [];
        const petsAdocao = petsCadastrados.filter(pet => pet.purpose === "adocao");

        // Combina os pets fictícios e cadastrados
        const todosPetsAdocao = [...petsFicticios, ...petsAdocao];

        petsSection.innerHTML = ""; // Limpa a seção antes de renderizar

        // Renderiza os pets
        todosPetsAdocao.forEach((pet, index) => {
            const petCard = document.createElement("div");
            petCard.className = "pet-card";

            // Verifica se o pet está nos favoritos
            const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            const isFavorito = favoritos.some(fav => fav.image === pet.image);

            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <div class="card-content">
                    <h3>${pet.name}</h3>
                    <p>Raça: ${pet.race}</p>
                    <p>Descrição: ${pet.description}</p>
                    <p>Idade: ${pet.age} anos</p>
                </div>
                <div class="card-actions">
                    <button class="favorite-button ${isFavorito ? 'favorited' : ''}" onclick="toggleFavorito('${pet.image}', this)">
                        &#9733;
                    </button>
                    <a href="#" class="button">Adote</a>
                </div>
            `;

            petsSection.appendChild(petCard);
        });
    };

    const toggleFavorito = (petImage, button) => {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const petsCadastrados = JSON.parse(localStorage.getItem("pets")) || [];
        const petsFicticios = [
            {
                name: "Bolinha",
                race: "Vira-Lata",
                description: "Adora crianças e passeios no parque.",
                age: "3",
                purpose: "adocao",
                image: "../imgs/bolinha.jpg"
            },
            {
                name: "Luna",
                race: "Golden Retriever",
                description: "Muito dócil e adora correr.",
                age: "2",
                purpose: "adocao",
                image: "../imgs/luna.jpg"
            }
        ];
        const todosPetsAdocao = [...petsFicticios, ...petsCadastrados];
        const pet = todosPetsAdocao.find(p => p.image === petImage);

        if (!pet) {
            alert("Erro ao localizar o pet.");
            return;
        }

        const petIndex = favoritos.findIndex(fav => fav.image === pet.image);

        if (petIndex === -1) {
            favoritos.push(pet);
            button.classList.add("favorited");
            alert(`${pet.name} foi adicionado aos favoritos!`);
        } else {
            favoritos.splice(petIndex, 1);
            button.classList.remove("favorited");
            alert(`${pet.name} foi removido dos favoritos!`);
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    };

    // Torna a função global para que seja acessível nos botões
    window.toggleFavorito = toggleFavorito;

    renderizarPetsAdocao();
});
