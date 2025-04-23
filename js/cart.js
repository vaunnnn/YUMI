const currentUser = localStorage.getItem("currentUser");
let cartItems = JSON.parse(localStorage.getItem(`${currentUser}-cart`)) || [];
const cartContainer = document.getElementById("cart-container");
const cartItemTemplate = document.getElementById("cartItemTemplate");

function updateLocalStorage() {
    localStorage.setItem(`${currentUser}-cart`, JSON.stringify(cartItems));
}

function renderCart() {
    cartContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = cartItemTemplate.content.cloneNode(true);

        const img = cartItem.querySelector(".cart-img");
        const title = cartItem.querySelector(".title");
        const quantity = cartItem.querySelector(".quantity");
        const total = cartItem.querySelector(".total");
        const addBtn = cartItem.querySelector(".add-btn");
        const subtractBtn = cartItem.querySelector(".subtract-btn");
        const removeBtn = cartItem.querySelector(".remove-btn");

        img.src = item.images[0];
        title.textContent = item.title;
        quantity.textContent = `${item.quantity}`;
        total.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        addBtn.addEventListener("click", () => {
            item.quantity++;
            updateLocalStorage();
            renderCart();
            updateSummary();
        });

        subtractBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateLocalStorage();
                renderCart();
                updateSummary();
            }
        });

        removeBtn.addEventListener("click", () => {
            cartItems.splice(index, 1);
            updateLocalStorage();
            renderCart();
            updateSummary();
        });

        cartContainer.appendChild(cartItem);
    });

    document.querySelector("#item-count").textContent = `Total ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} Item(s)`;
    updateSummary();
}

// ----------------------SUMMARY---------------------------
function updateSummary() {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const rawTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.querySelector("#order-quantity").textContent = `Total ${totalQuantity} Item(s)`;
    document.querySelector("#order-total").textContent = `$${rawTotal.toFixed(2)}`;

    const shippingSelect = document.querySelector("#shipping");
    const shippingValue = shippingSelect.value;
    let shippingFee = 0;
    let deliveryDays = 0;

    if (shippingValue === "standard") {
        shippingFee = 20;
        deliveryDays = 14; 
    } else if (shippingValue === "express") {
        shippingFee = 35;
        deliveryDays = 7;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    const formattedDate = `${(deliveryDate.getMonth() + 1).toString().padStart(2, '0')}/${deliveryDate.getDate().toString().padStart(2, '0')}/${deliveryDate.getFullYear().toString().slice(-2)}`;
    document.querySelector("#delivery-date").textContent = formattedDate;

    const subtotal = rawTotal + shippingFee;
    document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;

    const voucherSelect = document.querySelector("#voucher");
    const voucherValue = voucherSelect.value;
    let discount = 0;

    if (voucherValue === "save10") {
        discount = subtotal * 0.10;
    } else if (voucherValue === "freeship") {
        discount = shippingFee;
    } else if (voucherValue === "welcome15") {
        discount = subtotal * 0.15;
    }

    const total = subtotal - discount;
    document.querySelector("#total").textContent = `$${total.toFixed(2)}`;
}

document.querySelector("#shipping").addEventListener("change", updateSummary);
document.querySelector("#voucher").addEventListener("change", updateSummary);

updateSummary();
renderCart();