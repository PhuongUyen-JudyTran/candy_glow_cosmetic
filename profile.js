
document.addEventListener('DOMContentLoaded', function () {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!user) {
        alert("Please login to continue!");
        window.location.href = "login.html";
        return;
    }

    document.getElementById('display-fullname').innerText = user.fullname || "default";
    document.getElementById('display-username').innerText = user.username;
    document.getElementById('display-email').innerText = user.email;
    document.getElementById('display-phone').innerText = user.phone || "default";

    document.getElementById('btn-logout-profile').onclick = function () {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('currentUser');
            window.location.href = "index.html";
        }
    };
});
