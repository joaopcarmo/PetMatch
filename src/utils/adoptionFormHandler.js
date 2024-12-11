document.addEventListener('DOMContentLoaded', function () {
    const loadUserData = () => {
        const name = localStorage.getItem('name') || '';
        const email = localStorage.getItem('username') || '';
        const phone = localStorage.getItem('phone') || '';

        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone; // Carrega sem formatação
    };

    const formatPhoneNumber = (phone) => {
        const cleaned = phone.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cleaned.length <= 2) return `(${cleaned}`;
        if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    };

    const handlePhoneInput = (event) => {
        const input = event.target;
        const rawValue = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        const formattedValue = formatPhoneNumber(rawValue);
        input.value = formattedValue;
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^\d{11}$/.test(phone.replace(/\D/g, ''));

    const validateForm = () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name) {
            alert('Por favor, preencha o campo Nome.');
            return false;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido no formato xxxxx@xxxx.com.');
            return false;
        }

        if (!isValidPhone(phone)) {
            alert('Por favor, insira um número de telefone válido com 11 dígitos.');
            return false;
        }

        return true;
    };

    const showPopup = () => {
        // Criação de um pop-up personalizado
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = '#fff';
        popup.style.border = '2px solid #d496a7';
        popup.style.borderRadius = '8px';
        popup.style.padding = '20px';
        popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        popup.style.zIndex = '1000';
        popup.style.textAlign = 'center';

        const message = document.createElement('p');
        message.innerText = 'O dono do pet entrará em contato em breve!';
        message.style.fontSize = '18px';
        message.style.color = '#333';

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Fechar';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.backgroundColor = '#d496a7';
        closeButton.style.color = '#fff';
        closeButton.style.cursor = 'pointer';

        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
        });

        popup.appendChild(message);
        popup.appendChild(closeButton);

        document.body.appendChild(popup);
    };

    const saveUserData = (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.replace(/\D/g, '');

        localStorage.setItem('name', name);
        localStorage.setItem('username', email);
        localStorage.setItem('phone', phone);

        // Exibe o pop-up de confirmação
        showPopup();

        document.getElementById('petForm').reset();
    };

    // Inicializa os eventos e carrega os dados
    loadUserData();

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', handlePhoneInput);

    const form = document.getElementById('petForm');
    form.addEventListener('submit', saveUserData);
});