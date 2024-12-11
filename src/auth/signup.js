document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    // Verifica se o nome de usuário já existe
    const existingUsername = localStorage.getItem("username");

    if (existingUsername === username) {
        // Exibe uma mensagem de erro se o usuário já existir
        document.getElementById("signupMessage").innerText = "Este nome de usuário já está em uso.";
        document.getElementById("signupMessage").style.color = "red";
    } else {
        // Armazena os dados de credenciais no localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Define a sessão como ativa
        localStorage.setItem("isLoggedIn", "true");

        // Exibe a mensagem de sucesso
        document.getElementById("signupMessage").innerText = "Conta criada com sucesso!";
        document.getElementById("signupMessage").style.color = "green";

        // Redireciona para a página index.html após 2 segundos
        // biome-ignore lint/complexity/useArrowFunction: <explanation>
                setTimeout(function() {
            window.location.href = "menu.html";
        }, 2000);
    }
});
