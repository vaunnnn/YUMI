import convertUsdToPhp from "../js/utilities/convertUsdToPhp.js";
import { formatDate, updateLocalStorage } from "./utilities/userUtils.js";

const currentUser = localStorage.getItem("currentUser");
let cartItems = JSON.parse(localStorage.getItem(`${currentUser}-cart`)) || [];
const cartContainer = document.getElementById("cart-container");
const cartItemTemplate = document.getElementById("cartItemTemplate");
 


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
        const convertToPhp =  convertUsdToPhp(item.price) * item.quantity;
        total.textContent = `P ${convertToPhp.toFixed(2)}`;

        addBtn.addEventListener("click", () => {
            item.quantity++;
            updateLocalStorage(currentUser, cartItems);
            renderCart();
            updateSummary();
        });

        subtractBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateLocalStorage(currentUser, cartItems);
                renderCart();
                updateSummary();
            }
        });

        removeBtn.addEventListener("click", () => {
            cartItems.splice(index, 1);
            updateLocalStorage(currentUser, cartItems);
            renderCart();
            updateSummary();
        });

        
        cartContainer.appendChild(cartItem);
        
    });

    document.querySelector("#item-count").textContent = `Total ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} Item(s)`;
}

// ----------------------SUMMARY---------------------------
function updateSummary() {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const rawTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.querySelector("#order-quantity").textContent = `Total ${totalQuantity} Item(s)`;
    document.querySelector("#order-total").textContent =  `P ${convertUsdToPhp(rawTotal)}`;

    const shippingSelect = document.querySelector("#shipping").value;
    let shippingFee = 0;
    let deliveryDays = 0;

    if (shippingSelect === "Standard Delivery") {
        shippingFee = 2;
        deliveryDays = 14;
    } else if (shippingSelect === "Express Delivery") {
        shippingFee = 5;
        deliveryDays = 7;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    const formattedDate = `${formatDate(deliveryDate)}`;
    document.querySelector("#delivery-date").textContent = formattedDate;

    const subtotal = rawTotal + shippingFee;
    document.querySelector("#subtotal").textContent = `P ${convertUsdToPhp(subtotal)}`;

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
    document.querySelector("#total").textContent = `P ${convertUsdToPhp(total)}`;
}

document.querySelector("#shipping").addEventListener("change", updateSummary);
document.querySelector("#voucher").addEventListener("change", updateSummary);
document.querySelector("#shipping").addEventListener("change", updateCheckoutButton);
document.querySelector("#payment").addEventListener("change", updateCheckoutButton);

function updateCheckoutButton() {
    const shippingValue = document.querySelector("#shipping").value;
    const paymentValue = document.querySelector("#payment").value;
    const checkoutBtn = document.querySelector("#checkout");

    if (shippingValue && paymentValue && cartItems[0]) {
        checkoutBtn.style.backgroundColor = ""; 
        checkoutBtn.disabled = false;
        checkoutBtn.classList.add("checkout-enabled");
        checkoutBtn.style.cursor = "pointer";
    } else {
        checkoutBtn.style.backgroundColor = "#ccc";
        checkoutBtn.disabled = true;
        checkoutBtn.style.cursor = "not-allowed";
    }
}
updateCheckoutButton();

document.querySelector("#checkout").addEventListener("click", () => {

    const currentUser = localStorage.getItem("currentUser");
    const profileData = JSON.parse(localStorage.getItem(`${currentUser}-profile`)) || {};
    const addressData = JSON.parse(localStorage.getItem(`${currentUser}-address`)) || {};
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const requiredProfileFields = ["fname", "lname", "email", "phone"];
    const requiredAddressFields = ["street", "brgy", "town", "province", "country", "zip"];

    const isProfileIncomplete = requiredProfileFields.some(field => !profileData[field]?.trim());
    const isAddressIncomplete = requiredAddressFields.some(field => !addressData[field]?.trim());

    if (isProfileIncomplete || isAddressIncomplete) {
        alert("Please complete your profile before proceeding to checkout.");
        return window.location.href = "profile.html";
    }


    const shippingValue = document.querySelector("#shipping").value;
    const voucherValue = document.querySelector("#voucher").value;
    const paymentValue = document.querySelector('#payment').value;
    const deliveryDate = document.querySelector("#delivery-date").textContent;
    const subtotal = parseFloat(document.querySelector("#subtotal").textContent.slice(1));
    const total = parseFloat(document.querySelector("#total").textContent.slice(1));
    const discount = (subtotal - total).toFixed(2);
    const merchUsdTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); 
    const merchandiseTotal = convertUsdToPhp(merchUsdTotal);

    const checkoutBtn = document.querySelector("#checkout");

    if(shippingValue && paymentValue) {
        checkoutBtn.style.backgroundColor = "#1abc9c";
    }
    const today = new Date();
    today.setDate(today.getDate());
    const formattedDate = `${formatDate(today)}`;
    

    const checkoutData = {
        shippingMethod: shippingValue,
        voucherUsed: voucherValue,
        paymentMethod: paymentValue,
        quantity: totalQuantity,
        dateOrdered: formattedDate,
        deliveryDate,
        merchandiseTotal,
        subtotal: subtotal.toFixed(2),
        discount,
        total: total.toFixed(2)
    };

    
    
    localStorage.setItem(`${currentUser}-checkoutData`, JSON.stringify(checkoutData));

    window.location.href = "checkout.html";
});



updateSummary();
renderCart();