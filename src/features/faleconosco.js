document.addEventListener('DOMContentLoaded', () => {
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("mensagem");
    const contactForm = document.getElementById("suporte-form");
    const popup = document.getElementById("popup");

    // Carrega o e-mail do LocalStorage
    const email = localStorage.getItem("username") || "Não cadastrado";
    emailField.value = email;

    // Função para exibir o pop-up
    const showPopup = (message) => {
        document.querySelector(".popup-message").innerText = message;
        popup.style.display = "block";
    };

    // Fecha o pop-up ao clicar no botão
    const closePopup = () => {
        popup.style.display = "none";
    };
    window.closePopup = closePopup;

    // Manipula o envio do formulário
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const message = messageField.value.trim();

        if (!message) {
            showPopup("Por favor, escreva uma mensagem antes de enviar.");
            return;
        }

        // Armazena o email e a mensagem no localStorage
        const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        messages.push({ email, message });
        localStorage.setItem("contactMessages", JSON.stringify(messages));

        // Exibe o pop-up de sucesso
        showPopup("Sua mensagem foi enviada com sucesso! Em até 3 dias entraremos em contato por email.");

        // Limpa o campo de mensagem
        messageField.value = "";
    });
});
