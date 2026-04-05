document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const username = document.getElementById('username').value.trim();
    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPass').value;
    
    let isValid = true;

    if (username === "" || /\s/.test(username)) {
        showError('username', "Username don't empty or have space!");
        isValid = false;
    }

  
    if (fullname === "") {
        showError('fullname', "Full name don't empty!");
        isValid = false;
    }

  
    if (!/^[0-9]{10,11}$/.test(phone)) {
        showError('phone', "Phone must be a number (10-11 digits)!");
        isValid = false;
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', "Email is not in the correct format!");
        isValid = false;
    }


    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    if (!passRegex.test(pass)) {
        showError('password', "Password must contain uppercase, lowercase, number, special character and be at least 10 characters long!");
        isValid = false;
    }


    if (pass !== confirmPass) {
        showError('confirmPass', "Confirm password does not match!");
        isValid = false;
    }

    if (isValid) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.username === username)) {
            showError('username', "Username already exists!");
            return;
        }

        users.push({ username, fullname, phone, email, pass });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration successful!");
        window.location.href = "login.html";
    }
});

function showError(id, msg) {
    const input = document.getElementById(id);
    input.parentElement.querySelector('.error-msg').innerText = msg;
    input.style.border = "1px solid #EF2D8E";
}

function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(m => m.innerText = "");
    document.querySelectorAll('.custom-input').forEach(i => i.style.border = "none");
}