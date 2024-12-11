document.addEventListener("DOMContentLoaded", function () {
  const petForm = document.getElementById("petForm");
  const fileInput = document.getElementById("file-upload");
  const fileNameDisplay = document.getElementById("file-name-display");
  const fileError = document.getElementById("file-error");

  const maxNameLength = 30;
  const maxRaceLength = 41;
  const maxDescriptionLength = 85;

  // Validação de tipo de arquivo de imagem
  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const fileType = fileInput.files[0].type;

      if (!allowedTypes.includes(fileType)) {
        fileError.textContent = "Apenas imagens PNG ou JPEG são permitidas.";
        fileInput.value = "";
        fileNameDisplay.textContent = "Nenhum arquivo selecionado";
      } else {
        fileError.textContent = "";
        fileNameDisplay.textContent = fileInput.files[0].name;
      }
    } else {
      fileNameDisplay.textContent = "Nenhum arquivo selecionado";
    }
  });

  // Configuração de contador de caracteres
  function setupCharacterCounter(inputId, maxLength) {
    const inputElement = document.getElementById(inputId);

    const wrapper = document.createElement("div");
    wrapper.className = "input-wrapper";
    inputElement.parentNode.insertBefore(wrapper, inputElement);
    wrapper.appendChild(inputElement);

    const counterElement = document.createElement("span");
    counterElement.className = "char-counter";
    counterElement.textContent = `0/${maxLength}`;
    wrapper.appendChild(counterElement);

    inputElement.addEventListener("input", function (event) {
      const valueLength = event.target.value.length;
      counterElement.textContent = `${valueLength}/${maxLength}`;

      const errorSpanId = `${inputId}-error`;
      let errorSpan = document.getElementById(errorSpanId);

      if (valueLength > maxLength) {
        if (!errorSpan) {
          errorSpan = document.createElement("span");
          errorSpan.id = errorSpanId;
          errorSpan.className = "error-message";
          errorSpan.textContent = `O campo deve ter no máximo ${maxLength} caracteres.`;
          wrapper.appendChild(errorSpan);
        }
        inputElement.classList.add("error");
      } else {
        if (errorSpan) {
          errorSpan.remove();
        }
        inputElement.classList.remove("error");
      }
    });
  }

  setupCharacterCounter("petName", maxNameLength);
  setupCharacterCounter("racaPet", maxRaceLength);
  setupCharacterCounter("descricao", maxDescriptionLength);

  petForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let formIsValid = true;

    // Validação de imagem
    if (!fileInput.files.length) {
      fileError.textContent = "Por favor, selecione uma imagem.";
      fileInput.classList.add("error");
      formIsValid = false;
    } else {
      fileError.textContent = "";
      fileInput.classList.remove("error");
    }

    // Validação de campos do formulário
    const fields = [
      {
        id: "petName",
        message: "Por favor, preencha o nome do pet.",
        maxLength: maxNameLength,
      },
      {
        id: "racaPet",
        message: "Por favor, preencha a raça do pet.",
        maxLength: maxRaceLength,
      },
      {
        id: "descricao",
        message: "Por favor, preencha a descrição do pet.",
        maxLength: maxDescriptionLength,
      },
      { id: "petAge", message: "Por favor, preencha a idade do pet." },
      { id: "petType", message: "Por favor, selecione o sexo do pet." },
      {
        id: "petFinalidade",
        message: "Por favor, selecione a finalidade do cadastro.",
      },
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const errorSpanId = `${field.id}-error`;
      let errorSpan = document.getElementById(errorSpanId);

      if (!input.value.trim()) {
        if (!errorSpan) {
          errorSpan = document.createElement("span");
          errorSpan.id = errorSpanId;
          errorSpan.className = "error-message";
          errorSpan.textContent = field.message;
          input.parentNode.appendChild(errorSpan);
        }
        input.classList.add("error");
        formIsValid = false;
      } else if (field.maxLength && input.value.length > field.maxLength) {
        if (!errorSpan) {
          errorSpan = document.createElement("span");
          errorSpan.id = errorSpanId;
          errorSpan.className = "error-message";
          errorSpan.textContent = `O campo deve ter no máximo ${field.maxLength} caracteres.`;
          input.parentNode.appendChild(errorSpan);
        }
        input.classList.add("error");
        formIsValid = false;
      } else {
        if (errorSpan) {
          errorSpan.remove();
        }
        input.classList.remove("error");
      }
    });

    if (!formIsValid) {
      return;
    }

    // Lógica para salvar o pet no localStorage
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64Image = event.target.result;

      const petName = document.getElementById("petName").value.trim();
      const petRaca = document.getElementById("racaPet").value.trim();
      const petDescription = document.getElementById("descricao").value.trim();
      const petAge = document.getElementById("petAge").value.trim();
      const petType = document.getElementById("petType").value.trim();
      const petFinalidade = document
        .getElementById("petFinalidade")
        .value.trim(); // Finalidade

      const newPet = {
        id: Date.now().toString(), // ID único
        name: petName,
        race: petRaca,
        description: petDescription,
        age: petAge,
        type: petType,
        purpose: petFinalidade, // Finalidade
        image: base64Image,
      };

      const pets = JSON.parse(localStorage.getItem("pets")) || [];
      pets.push(newPet);
      localStorage.setItem("pets", JSON.stringify(pets));

      alert("Pet cadastrado com sucesso!");
      window.location.href = "meus-pets.html"; // Redireciona para a página dos pets cadastrados
    };

    reader.readAsDataURL(file); // Lê a imagem do arquivo
  });
});
