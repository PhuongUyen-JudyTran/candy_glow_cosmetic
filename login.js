document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userIn = document.querySelector('input[placeholder="Username"]').value.trim();
    const passIn = document.querySelector('input[placeholder="Password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === userIn && u.pass === passIn);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert("Welcome back, " + user.username + " !");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password!");
    }
});