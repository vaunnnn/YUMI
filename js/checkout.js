import { getUserData } from "../js/utilities/userUtils.js";

const checkout = () => {

    const profileData = getUserData("profile");
    const addressData = getUserData("address");
    const cartData = getUserData("cart");   
    const checkoutData = getUserData("checkoutData");

    const customerName = document.querySelector(".customer-name");
    const customerPhone = document.querySelector(".customer-phone");

    const customerAddress = document.querySelector(".customer-address");


    customerName.textContent = profileData.fname + " " +  profileData.lname;
    customerPhone.textContent = profileData.phone;

    const {street, town, province, country, zip} = addressData;
    const {shippingMethod, voucherUsed, paymentMethod, deliveryDate, subtotal, discount, total} = checkoutData;


    customerAddress.textContent = `${street}, ${town}, ${province}, ${country}, ${zip}`;

    console.log(customerName);

}

checkout();

