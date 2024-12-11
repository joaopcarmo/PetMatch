document.addEventListener("DOMContentLoaded", () => {
  let tempData = {}; // Objeto para armazenar dados temporários

  // Função para carregar os dados salvos no LocalStorage
  const loadData = () => {
    const profilePic = localStorage.getItem("profilePic");
    const name = localStorage.getItem("name") || "Carregando...";
    const email = localStorage.getItem("username") || "Carregando...";
    const phone = localStorage.getItem("phone") || "Adicionar número";
    const city = localStorage.getItem("city") || "Adicionar cidade";
    const intent = localStorage.getItem("intent") || "Adoção";
    const gender = localStorage.getItem("gender") || "Ambos";
    const breed = localStorage.getItem("breed") || "Indefinida";
    const age = localStorage.getItem("age") || "Sem preferência";

    // Atualiza a foto de perfil em todas as páginas
    const profilePicElements = document.querySelectorAll(
      "#profile-pic, #profilePicHeader"
    );
    profilePicElements.forEach((element) => {
      element.src = profilePic || "../imgs/default-profile.png"; // Caminho da imagem padrão
    });

    // Atualiza os elementos de texto na página
    document.getElementById("user-name").innerText = name;
    document.getElementById("user-email").innerText = email;
    document.getElementById(
      "info-name"
    ).innerHTML = `${name} <i class="fa fa-pencil edit-icon"></i>`;
    document.getElementById(
      "info-email"
    ).innerHTML = `${email} <i class="fa fa-pencil edit-icon"></i>`;
    document.getElementById(
      "info-phone"
    ).innerHTML = `${phone} <i class="fa fa-pencil edit-icon"></i>`;
    document.getElementById(
      "info-city"
    ).innerHTML = `${city} <i class="fa fa-pencil edit-icon"></i>`;
    document.getElementById(
      "info-intent"
    ).innerHTML = `${intent} <i class="fa fa-pencil edit-icon"></i>`;
    document.getElementById(
      "info-gender"
    ).innerHTML = `${gender} <i class="fa fa-pencil edit-icon"></i>`;
    document.getElementById(
      "info-breed"
    ).innerHTML = `${breed} <i class="fa fa-pencil edit-icon"></i>`;
    document.getElementById(
      "info-age"
    ).innerHTML = `${age} <i class="fa fa-pencil edit-icon"></i>`;

    addEditListeners(); // Adiciona os ouvintes de evento para edição
  };

  // Função para habilitar edição de um campo
  const enableEdit = (span) => {
    const currentValue = span.innerText
      .replace(' <i class="fa fa-pencil edit-icon"></i>', "")
      .trim();
    const inputType =
      span.id === "info-intent" ||
      span.id === "info-gender" ||
      span.id === "info-age"
        ? "select"
        : "input";
    const input = document.createElement(inputType);

    if (inputType === "select") {
      const options =
        span.id === "info-intent"
          ? ["Adoção", "Match", "Ambos"]
          : span.id === "info-gender"
          ? ["Fêmea", "Macho", "Ambos"]
          : [
              "0 a 2 anos",
              "2 a 5 anos",
              "5 a 8 anos",
              "+ de 8 anos",
              "Sem preferência",
            ];

      options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        opt.selected = option === currentValue;
        input.appendChild(opt);
      });

      input.addEventListener("change", () => {
        span.innerHTML = `${input.value} <i class="fa fa-pencil edit-icon"></i>`;
        tempData[span.id] = input.value; // Salva temporariamente
        addEditListeners();
      });
    } else {
      input.type = "text";
      input.value = currentValue;

      // Adiciona formatação ao campo de telefone
      if (span.id === "info-phone") {
        input.addEventListener("input", (event) => {
          let phoneValue = event.target.value.replace(/\D/g, "");
          if (phoneValue.length > 11) phoneValue = phoneValue.slice(0, 11);
          event.target.value = phoneValue.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
          );
        });
      }

      // Adiciona validação ao campo de e-mail
      if (span.id === "info-email") {
        input.addEventListener("blur", () => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            alert("Por favor, insira um e-mail válido.");
            input.value = currentValue; // Restaura o valor antigo em caso de e-mail inválido
          }
        });
      }

      input.addEventListener("blur", () => {
        span.innerHTML = `${
          input.value || currentValue
        } <i class="fa fa-pencil edit-icon"></i>`;
        tempData[span.id] = input.value || currentValue; // Salva temporariamente
        addEditListeners();
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          span.innerHTML = `${
            input.value || currentValue
          } <i class="fa fa-pencil edit-icon"></i>`;
          tempData[span.id] = input.value || currentValue; // Salva temporariamente
          addEditListeners();
        }
      });
    }

    span.innerHTML = "";
    span.appendChild(input);
    input.focus();
  };

  // Adiciona os ouvintes de evento de edição
  const addEditListeners = () => {
    document.querySelectorAll(".edit-icon").forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const span = event.target.closest("span");
        enableEdit(span);
      });
    });
  };

  // Função para salvar os dados no LocalStorage ao clicar em Confirmar
  const saveData = () => {
    const fieldMap = {
      "info-name": "name",
      "info-email": "username",
      "info-phone": "phone",
      "info-city": "city",
      "info-intent": "intent",
      "info-gender": "gender",
      "info-breed": "breed",
      "info-age": "age",
    };

    for (const id in tempData) {
      if (fieldMap[id]) {
        localStorage.setItem(fieldMap[id], tempData[id]);
      }
    }

    if (tempData["profilePic"]) {
      localStorage.setItem("profilePic", tempData["profilePic"]);
    }

    alert("Informações atualizadas com sucesso!");
    location.reload(); // Recarrega a página
  };

  // Configurações iniciais
  document.querySelector(".confirm-button").addEventListener("click", saveData);

  // Função de logout
  document.querySelector(".logout-button").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    alert("Você saiu da conta.");
    window.location.href = "login.html"; // Redireciona para a página de login
  });

  // Função para excluir conta
  document
    .querySelector(".delete-account-button")
    .addEventListener("click", () => {
      if (confirm("Tem certeza que deseja excluir sua conta?")) {
        localStorage.clear(); // Remove todos os dados
        alert("Conta excluída com sucesso.");
        window.location.href = "signup.html"; // Redireciona para a página de cadastro
      }
    });

  // Upload de foto de perfil
  const photoInput = document.getElementById("photo-input");
  document.getElementById("profile-pic").addEventListener("click", () => {
    photoInput.click();
  });

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (!file) {
      alert("Nenhum arquivo selecionado.");
      return;
    }

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Por favor, selecione um arquivo PNG ou JPEG.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      tempData["profilePic"] = reader.result; // Salva temporariamente
      const profilePicElements = document.querySelectorAll(
        "#profile-pic, #profilePicHeader"
      );
      profilePicElements.forEach((element) => {
        element.src = reader.result;
      });
    };
    reader.readAsDataURL(file);
  });

  loadData();
});
