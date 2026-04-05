
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {

        const user = localStorage.getItem('currentUser');
        if (!user) {
            alert("Please login to continue!");
            window.location.href = "login.html";
            return; 
        }

        const box = this.closest('.product-card') || this.closest('.product-item'); 
        const name = box.querySelector('.product-name').innerText;
        const priceText = box.querySelector('.product-price').innerText;
        const price = Number(priceText.replace('$', '').trim()); 
        const img = box.querySelector('img').src; 

        let cart = JSON.parse(localStorage.getItem('myCart')) || [];

        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const product = { name, price, img, quantity: 1 };
            cart.push(product);
        }

        localStorage.setItem('myCart', JSON.stringify(cart));
        
        updateCartBadge(); 

        alert("Added " + name + " to the cart!");
    });
});


function updateCartBadge() {
    const user = localStorage.getItem('currentUser');
    const badge = document.querySelector('.badge-cart');
    if (!badge) return;

    if (!user) {
        badge.innerText = "0";
        return;
    }

    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    badge.innerText = totalItems;
}


updateCartBadge();