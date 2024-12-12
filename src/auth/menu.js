document.addEventListener("DOMContentLoaded", () => {
    // Exibe o pop-up após 1 minuto
    setTimeout(() => {
        const ratingPopup = document.getElementById("ratingPopup");
        if (ratingPopup) {
            ratingPopup.style.display = "flex"; // Mostra o pop-up
        }
    }, 50000); 

    // Lógica de seleção de estrelas
    const stars = document.querySelectorAll(".star");
    let selectedRating = 0;

    stars.forEach((star) => {
        star.addEventListener("click", () => {
            selectedRating = star.getAttribute("data-rating");
            stars.forEach((s) => s.classList.remove("selected")); // Remove seleção de todas
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add("selected"); // Adiciona seleção até a estrela clicada
            }
        });
    });

    // Lógica para o botão de envio
    document.getElementById("submitRating").addEventListener("click", () => {
        if (selectedRating > 0) {
            alert(`Obrigado por avaliar com ${selectedRating} estrelas!`);
            document.getElementById("ratingPopup").style.display = "none"; // Fecha o pop-up
        } else {
            alert("Por favor, selecione uma quantidade de estrelas para avaliar.");
        }
    });
});
