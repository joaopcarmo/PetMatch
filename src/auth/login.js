document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Recupera as credenciais armazenadas
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Verifica se as credenciais estão corretas
    if (username === storedUsername && password === storedPassword) {
        // Define a sessão como ativa
        localStorage.setItem("isLoggedIn", "true");

        // Exibe a mensagem de sucesso
        document.getElementById("loginMessage").innerText = "Login aprovado!";
        document.getElementById("loginMessage").style.color = "green";

        // Redireciona para a página index.html após 2 segundos
        // biome-ignore lint/complexity/useArrowFunction: <explanation>
                setTimeout(function() {
            window.location.href = "index.html";
        }, 1000);
    } else {
        document.getElementById("loginMessage").innerText = "Usuário ou senha incorretos.";
        document.getElementById("loginMessage").style.color = "red";
    }
});
