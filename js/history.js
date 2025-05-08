import createTicket from "./components/historyCard.js";
import { getCurrentUser } from "./utilities/userUtils.js"

const currentUser = getCurrentUser();
const orderHistory = JSON.parse(localStorage.getItem(`${currentUser}-history`)) || [];

const renderHistory = () => {

    console.log(orderHistory)
    const historySection = document.querySelector("#order-history-container");

    orderHistory.forEach((item, index) => {
        const ticketCard = createTicket(item, index);

        historySection.appendChild(ticketCard);
    });

}


window.addEventListener("DOMContentLoaded", renderHistory);