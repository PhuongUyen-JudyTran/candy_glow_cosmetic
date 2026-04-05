document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginLink = document.getElementById('login-link');
    const userLogged = document.getElementById('user-logged');
    const nameDisplay = document.getElementById('user-name-display');

    if (currentUser) {
        if (loginLink) loginLink.classList.add('d-none');
        if (userLogged) userLogged.classList.remove('d-none');
        if (nameDisplay) nameDisplay.innerText = currentUser.username;
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm("Are you sure you want to logout?")) {
                localStorage.removeItem('currentUser');
                window.location.reload('../index.html');
            }
        });
    }

    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const badge = document.querySelector('.badge-cart');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        badge.innerText = totalItems;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const badge = document.querySelector('.badge-cart');

    if (!currentUser) {
        if (badge) {
            badge.style.display = "none"; 
        }
        
        const cartLink = document.querySelector('.fa-shopping-cart').parentElement;
        cartLink.onclick = function(e) {
            e.preventDefault();
            alert("Please login to use the cart!");
            window.location.href = "login.html";
        };
    } else {
        if (badge) {
            badge.style.display = "block";
            const cart = JSON.parse(localStorage.getItem('myCart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            badge.innerText = totalItems;
        }
    }
});