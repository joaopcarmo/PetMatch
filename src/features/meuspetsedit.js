function loadPetData() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const pet = pets[index];

    
    document.getElementById('current-image').src = pet.image;
    document.getElementById('edit-name').value = pet.name;
    document.getElementById('edit-race').value = pet.race;
    document.getElementById('edit-description').value = pet.description;
    document.getElementById('edit-age').value = pet.age;
    document.getElementById('edit-type').value = pet.type;
    document.getElementById('edit-purpose').value = pet.purpose;

    document.getElementById('edit-form').dataset.index = index;
}

function saveEdit() {
    const name = document.getElementById('edit-name');
    const race = document.getElementById('edit-race');
    const description = document.getElementById('edit-description');
    const age = document.getElementById('edit-age');
    const type = document.getElementById('edit-type');
    const purpose = document.getElementById('edit-purpose');

 
    let isValid = true;
    const fields = [name, race, description, age, type, purpose];

    fields.forEach((field) => {
        if (!field.value.trim()) {
            field.classList.add('error'); 
            isValid = false;
        } else {
            field.classList.remove('error'); 
        }
    });

    if (!isValid) {
        showPopup(); 
        return;
    }

    const index = document.getElementById('edit-form').dataset.index;
    const pets = JSON.parse(localStorage.getItem('pets')) || [];
    const fileInput = document.getElementById('edit-image');
    let updatedImage = pets[index].image;

  
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            updatedImage = event.target.result;

            pets[index] = {
                name: name.value.trim(),
                race: race.value.trim(),
                description: description.value.trim(),
                age: age.value.trim(),
                type: type.value,
                purpose: purpose.value,
                image: updatedImage,
            };

            localStorage.setItem('pets', JSON.stringify(pets));
            window.location.href = 'meus-pets.html';
        };

        reader.readAsDataURL(file);
    } else {
        
        pets[index] = {
            name: name.value.trim(),
            race: race.value.trim(),
            description: description.value.trim(),
            age: age.value.trim(),
            type: type.value,
            purpose: purpose.value,
            image: updatedImage,
        };

        localStorage.setItem('pets', JSON.stringify(pets));
        window.location.href = 'meus-pets.html';
    }
}

function cancelEdit() {
    window.location.href = 'meus-pets.html';
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}


window.onload = loadPetData;
