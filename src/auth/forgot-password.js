document.getElementById("forgotPasswordForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário imediatamente

    const emailField = document.getElementById("forgotPasswordEmail");
    const emailValue = emailField.value.trim();
    const messageElement = document.getElementById("forgotPasswordMessage");

    // Valida se o e-mail contém "@" e é válido
    if (!emailValue.includes("@") || !validateEmail(emailValue)) {
        messageElement.textContent = "Por favor, insira um e-mail válido.";
    } else {
        messageElement.textContent = ""; // Limpa a mensagem de erro
        displaySuccessMessage(); // Exibe a mensagem de sucesso e inicia o cronômetro
    }
});

// Função para validar e-mail usando uma expressão regular
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Exibe mensagem de sucesso e inicializa a contagem regressiva
function displaySuccessMessage() {
    const messageContainer = document.getElementById("messageContainer");
    const countdownElement = document.getElementById("countdown");
    const resendButton = document.getElementById("resendButton");
    const countdownMessage = document.getElementById("countdownMessage");

    // Mostra a mensagem de sucesso
    messageContainer.style.display = "block";
    resendButton.style.display = "none"; // Oculta botão de reenviar inicialmente
    countdownMessage.style.display = "block"; // Mostra a mensagem do cronômetro
    countdownElement.style.display = "inline"; // Certifica-se de que o cronômetro esteja visível
    countdownElement.textContent = "60"; // Inicializa o cronômetro com 60 segundos

    let countdown = 60;

    // Certifique-se de limpar qualquer contagem regressiva anterior
    if (window.activeCountdown) {
        clearInterval(window.activeCountdown);
    }

    // Inicia a contagem regressiva
    window.activeCountdown = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown; // Atualiza o valor no DOM

        if (countdown <= 0) {
            clearInterval(window.activeCountdown); // Para a contagem
            countdownElement.style.display = "none"; // Oculta o cronômetro
            countdownMessage.textContent = "Você pode reenviar o código.";
            resendButton.style.display = "block"; // Mostra o botão de reenviar
        }
    }, 1000);

    // Adiciona evento ao botão de reenviar
    resendButton.addEventListener("click", () => {
        resendCode();
    });
}

// Função para reiniciar o envio do código
function resendCode() {
    const resendButton = document.getElementById("resendButton");
    const countdownElement = document.getElementById("countdown");
    const countdownMessage = document.getElementById("countdownMessage");

    let countdown = 60;

    resendButton.style.display = "none"; // Oculta o botão de reenviar novamente
    countdownMessage.textContent = "Reenvio feito!";
    countdownElement.style.display = "inline"; // Certifica-se de que o cronômetro esteja visível
    countdownElement.textContent = "60"; // Reseta o cronômetro
    resendButton.style.display = "block"; // Mostra o botão de reenviar
    resendButton.style.margin = "20px auto"; // Centraliza o botão
    

    // Certifique-se de limpar qualquer contagem regressiva anterior
    if (window.activeCountdown) {
        clearInterval(window.activeCountdown);
    }

    // Reinicia a contagem regressiva
    window.activeCountdown = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown; // Atualiza o valor no DOM

        if (countdown <= 0) {
            clearInterval(window.activeCountdown); // Para a contagem
            countdownElement.style.display = "none"; // Oculta o cronômetro
            countdownMessage.textContent = "Você pode reenviar o código.";
            resendButton.style.display = "block"; // Mostra o botão de reenviar
        }
    }, 1000);
}

