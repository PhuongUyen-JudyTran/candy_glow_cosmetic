function loadCart() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let cartList = document.getElementById('cart-list');
    let subtotal = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<div class="text-center p-5"><h3>Shopping Cart is empty!</h3><a href="shop.html" class="btn btn-pink mt-3">Continue Shopping</a></div>';
        updateSummary(0);
        return;
    }

    let html = "";
    cart.forEach((item, index) => {
        let itemTotal = item.price * (item.quantity || 1);
        subtotal += itemTotal;
        html += `
            <div class="cart-item d-flex align-items-center p-3 mb-3">
                <div class="d-flex align-items-center" style="flex: 2;">
                    <img src="${item.img}" class="product-img me-3">
                    <span class="product-name">${item.name}</span>
                </div>

                <div class="quantity-box d-flex align-items-center justify-content-center" style="flex: 1;">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span class="mx-3 fw-bold">${item.quantity || 1}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>

                <div class="d-flex align-items-center justify-content-end" style="flex: 1;">
                    <span class="fw-bold me-3">$${itemTotal}</span>
                    <button class="btn btn-link p-0 text-dark" onclick="remove(${index})">
                        <i class="fas fa-trash-alt fs-5"></i>
                    </button>
                </div>
            </div>`;
    });

    cartList.innerHTML = html;
    updateSummary(subtotal);
    updateBadge();
}

function updateSummary(total) {
    const summaryRows = document.querySelectorAll('.summary-row .fw-bold');
    if (summaryRows.length >= 2) {
        summaryRows[0].innerText = "$" + total; 
        summaryRows[2].innerText = "$" + total; 
    }
}

window.remove = function(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart();
};

window.changeQty = function(index, delta) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    if (!cart[index].quantity) cart[index].quantity = 1;
    
    cart[index].quantity += delta;
    
    if (cart[index].quantity < 1) {
        if(confirm("Remove this item from cart?")) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = 1;
        }
    }
    
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart();
};

function updateBadge() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let badge = document.querySelector('.badge-cart');
    if (badge) {
        let count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        badge.innerText = count;
    }
}

document.addEventListener('DOMContentLoaded', loadCart);