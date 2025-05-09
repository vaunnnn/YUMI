import { formatDate } from "../utilities/userUtils.js"; 

const createTicket = (item, index) => {
    const historyTemplate = document.querySelector("#order-history-item-template");
    const ticketCard = historyTemplate.content.cloneNode(true);
    // const orderNumber = ticketCard.querySelector("order-number");

    const orderID = ticketCard.querySelector(".order-number");
    const date = ticketCard.querySelector(".delivery-date")
    const datePlaced = ticketCard.querySelector(".date-placed");
    const payment = ticketCard.querySelector(".payment-method");
    const pieces = ticketCard.querySelector(".total-quantity");
    const shipType = ticketCard.querySelector(".shipping-type");
    const orderTotal = ticketCard.querySelector(".order-total");
    console.log(item);

    const {shippingMethod, voucherUsed, paymentMethod, quantity, dateOrdered, deliveryDate, merchandiseTotal, subtotal, discount, total} = item;
    console.log(paymentMethod);
    console.log(deliveryDate);
    console.log(dateOrdered);


    orderID.textContent = ++index;
    datePlaced.textContent = dateOrdered;
    date.textContent = deliveryDate;
    payment.textContent = paymentMethod;
    pieces.textContent = quantity;
    shipType.textContent = shippingMethod;
    orderTotal.textContent = total;

    return ticketCard;
}

export default createTicket;