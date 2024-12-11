function renderizarSeusPets() {
    const container = document.querySelector(".pets-section");
    const seusPets = JSON.parse(localStorage.getItem("pets")) || []; 

 
    if (seusPets.length === 0) {
        container.innerHTML = "<p>Você ainda não cadastrou nenhum pet.</p>";
        return;
    }

    let html = "";

    seusPets.forEach((pet, index) => {
        html += `
            <div class="pet-card" data-index="${index}">
                <img src="${pet.image}" alt="${pet.name}">
                <div class="info">
                    <h3>${pet.name}</h3>
                    <p><strong>Raça:</strong> ${pet.race}</p>
                    <p><strong>Descrição:</strong> ${pet.description}</p>
                    <p><strong>Idade:</strong> ${pet.age}</p>
                    <p><strong>Sexo:</strong> ${pet.type}</p> 
                    <p><strong>Finalidade:</strong> ${pet.purpose}</p>
                </div>
                <div class="actions">
                    <a href="#" class="button" onclick="editarPet(${index})">Editar</a>
                    <a href="#" class="button-remove" data-index="${index}">Remover</a>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

   
    const removeButtons = container.querySelectorAll(".button-remove");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const petIndex = button.getAttribute("data-index");
            removerPet(petIndex);
        });
    });
}

function editarPet(index) {
    window.location.href = `meuspetsedit.html?index=${index}`;
}

function removerPet(index) {
    let seusPets = JSON.parse(localStorage.getItem("pets")) || [];
    seusPets.splice(index, 1); 
    localStorage.setItem("pets", JSON.stringify(seusPets)); 
    renderizarSeusPets(); 
}

document.addEventListener("DOMContentLoaded", renderizarSeusPets);
