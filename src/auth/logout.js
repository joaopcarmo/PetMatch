document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        // biome-ignore lint/complexity/useArrowFunction: <explanation>
        logoutButton.addEventListener("click", function() {
            // Remove apenas o status de sessão ativa, mantendo as credenciais
            localStorage.removeItem("isLoggedIn");

            // Redireciona para a página de cadastro (signup.html)
            window.location.href = "./signup.html";
        });
    }
});
