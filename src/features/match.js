document.addEventListener('DOMContentLoaded', () => {
    const renderizarPetsMatch = () => {
        const petsSection = document.getElementById("pets-section");

        // Pets fictícios para "Encontrar um par"
        const petsFicticios = [
            {
                name: "Jack",
                race: "Pastor Alemão",
                description: "Leal e protetor.",
                age: "3",
                purpose: "match",
                image: "../imgs/jack.jpg"
            },
            {
                name: "Daisy",
                race: "Buldogue Inglês",
                description: "Gentil e tranquila.",
                age: "5",
                purpose: "match",
                image: "../imgs/daisy.jpg"
            },
            {
                name: "Rocky",
                race: "Boxer",
                description: "Leal e cheio de energia.",
                age: "4",
                purpose: "match",
                image: "../imgs/rocky.jpg"
            }
        ];

        // Pets cadastrados no LocalStorage com a finalidade "Encontrar um par"
        const petsCadastrados = JSON.parse(localStorage.getItem("pets")) || [];
        const petsMatch = petsCadastrados.filter(pet => pet.purpose === "match");

        // Combina os pets fictícios e cadastrados
        const todosPetsMatch = [...petsFicticios, ...petsMatch];

        petsSection.innerHTML = ""; // Limpa a seção antes de renderizar

        // Renderiza os pets
        todosPetsMatch.forEach((pet) => {
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
                    <a href="#" class="button">Match</a>
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
                name: "Jack",
                race: "Pastor Alemão",
                description: "Leal e protetor.",
                age: "3",
                purpose: "match",
                image: "../imgs/jack.jpg"
            },
            {
                name: "Daisy",
                race: "Buldogue Inglês",
                description: "Gentil e tranquila.",
                age: "5",
                purpose: "match",
                image: "../imgs/daisy.jpg"
            },
            {
                name: "Rocky",
                race: "Boxer",
                description: "Leal e cheio de energia.",
                age: "4",
                purpose: "match",
                image: "../imgs/rocky.jpg"
            }
        ];
        const todosPetsMatch = [...petsFicticios, ...petsCadastrados];
        const pet = todosPetsMatch.find(p => p.image === petImage);

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

    renderizarPetsMatch();
});
