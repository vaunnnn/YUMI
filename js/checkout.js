import { getUserData, formatDate, updateLocalStorage } from "../js/utilities/userUtils.js";
import convertUsdToPhp from "../js/utilities/convertUsdToPhp.js";

const currentUser = localStorage.getItem("currentUser");
let cartItems = JSON.parse(localStorage.getItem(`${currentUser}-cart`)) || [];
const cartContainer = document.getElementById("cart-container");
const cartItemTemplate = document.getElementById("cartItemTemplate");


const checkout = () => {

    const profileData = getUserData("profile");
    const addressData = getUserData("address");
    const checkoutData = getUserData("checkoutData");

    if(cartItems.length === 0) {
        window.location.href = "dashboard.html";
    }

    const { street, town, province, country, zip } = addressData;
    const { shippingMethod, voucherUsed, paymentMethod, deliveryDate, merchandiseTotal, discount } = checkoutData;

    const customerName = document.querySelector(".customer-name");
    const customerPhone = document.querySelector(".customer-phone");
    const customerAddress = document.querySelector(".customer-address");
    const deliveryMethod = document.querySelector(".delivery-method");
    const shippingCost = document.querySelector(".shipping-cost");
    const voucherApplied = document.querySelector(".voucher-applied");
    const voucherDiscount = document.querySelector(".voucher-discount");
    const paymentType = document.querySelector(".payment-method");
    const estimatedDelivery = document.getElementById("estimated-delivery");
    const merchandiseSubtotal = document.getElementById("merchandise-subtotal");
    const shippingSubtotal = document.getElementById("shipping-subtotal");
    const discountSubtotal = document.getElementById("discount-subtotal");
    const totalAmount = document.getElementById("total-amount");


    customerName.textContent = profileData.fname + " " + profileData.lname;
    customerPhone.textContent = profileData.phone;
    customerAddress.textContent = `${street}, ${town}, ${province}, ${country}, ${zip}`;
    deliveryMethod.textContent = `Delivery Option: ${shippingMethod}`
    voucherApplied.textContent = voucherUsed ? `Applied Voucher: ${voucherUsed}` : "Applied Voucher: None";
    voucherDiscount.textContent = `Discount Price: ${discount}`;
    paymentType.textContent = `Mode of Payment: ${paymentMethod}`
    const rawDate = new Date(deliveryDate);
    const formattedDate = `${formatDate(rawDate)}`;
    estimatedDelivery.textContent = formattedDate;
    merchandiseSubtotal.textContent = merchandiseTotal;

    const shippingFees = {
        "Standard Delivery": 2,
        "Express Delivery": 5
    };

    const fee = shippingFees[shippingMethod];
    shippingCost.textContent = fee ? `Shipping Fee: P${convertUsdToPhp(fee)}` : "Shipping Fee: NULL";
    shippingSubtotal.textContent = fee ? `+ ${convertUsdToPhp(fee)}` : "+ 0";

    const merchandise = parseFloat(merchandiseTotal);
    const feeInPhp = parseFloat(convertUsdToPhp(fee));
    const discountValue = parseFloat(discount);

    let total = 0;

    if (voucherUsed === "freeship") {
        discountSubtotal.textContent = `- ${discount}`;
        total = merchandise + feeInPhp - discountValue;
    } else {
        discountSubtotal.textContent = `- ${discount}`;
        total = merchandise + feeInPhp - discountValue;
    }

    totalAmount.textContent = total.toFixed(2);


}

function renderCart() {
    cartContainer.innerHTML = '';

    if (!cartItems.length) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        document.querySelector("#item-count").textContent = "Total 0 Item(s)";
        return;
    }

    cartItems.forEach((item, index) => {
        const cartItem = cartItemTemplate.content.cloneNode(true);

        const img = cartItem.querySelector(".cart-img");
        const title = cartItem.querySelector(".title");
        const quantity = cartItem.querySelector(".quantity");
        const total = cartItem.querySelector(".total");

        img.src = item.images[0];
        img.alt = item.title;
        (item.quantity === 1) ? quantity.textContent = `${item.quantity}pc. `: quantity.textContent = `${item.quantity}pcs.`
        console.log(item.quantity)
        title.textContent = item.title;

        const convertedTotal = convertUsdToPhp(item.price) * item.quantity;
        total.textContent = `P ${convertedTotal.toFixed(2)}`;

       

        cartContainer.appendChild(cartItem);
    });

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector("#item-count").textContent = `Total ${totalItems} Item(s)`;
}

document.querySelector("#checkout-button").addEventListener("click", () => {

    let checkoutdata = JSON.parse(localStorage.getItem(`${currentUser}-checkoutData`));
    const orderHistory = JSON.parse(localStorage.getItem(`${currentUser}-history`)) || [];

    orderHistory.push(checkoutdata);

    localStorage.setItem(`${currentUser}-history`, JSON.stringify(orderHistory));

    localStorage.removeItem(`${currentUser}-checkoutData`);
    localStorage.removeItem(`${currentUser}-cart`);

    window.location.href = "history.html";
});



window.addEventListener("DOMContentLoaded", () => {
    checkout();
    renderCart();
})