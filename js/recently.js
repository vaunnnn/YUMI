import createProduct from "./components/wish&ree.js";

document.addEventListener("DOMContentLoaded", async () => {
    const currentUser = localStorage.getItem("currentUser"); 
    if(!currentUser) {
        alert("No user logged in.");
        window.location.href = "/html/signin.html";
    }

    const recents = JSON.parse(localStorage.getItem(`${currentUser}-recently-viewed`)) || [];
    const recentSection = document.querySelector('.wishlistSection');

    if (!recentSection) {
        console.error('Recently viewed section not found.');
        return;
    }

    if(recents.length === 0) {
        const emptyMessage = document.createElement("p");    
        emptyMessage.textContent = "Your recently viewed products are empty.";
        recentSection.appendChild(emptyMessage);
    }
    
    recents.forEach(item => {
        const productCard = createProduct(item);
        recentSection.appendChild(productCard);
    });

});