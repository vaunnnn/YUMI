import createTicket from "./components/historyCard.js";
import { getCurrentUser } from "./utilities/userUtils.js"

const currentUser = getCurrentUser();
const orderHistory = JSON.parse(localStorage.getItem(`${currentUser}-history`)) || [];

const renderHistory = () => {

    console.log(orderHistory)
    const historySection = document.querySelector("#order-history-container");

    if (orderHistory.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Order history is empty.';
        emptyMessage.style.textAlign = "center"
        emptyMessage.style.padding = "16px"
        emptyMessage.style.opacity = ".5"
        historySection.appendChild(emptyMessage);
        return;
    }

    orderHistory.forEach((item, index) => {
        const ticketCard = createTicket(item, index);

        historySection.appendChild(ticketCard);
    });

}


window.addEventListener("DOMContentLoaded", renderHistory);