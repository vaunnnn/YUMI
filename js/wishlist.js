import createProduct from "./components/wish&ree.js";

const displayWishlist = () => {
    const currentUser = localStorage.getItem("currentUser"); 
    if (!currentUser) {
        alert("No user logged in.");
        window.location.href = "/html/signin.html";
    }

    const wishlist = JSON.parse(localStorage.getItem(`${currentUser}-wishlist`)) || [];
    const wishlistSection = document.querySelector('.wishlistSection');

    if (!wishlistSection) {
        console.error('Wishlist section not found.');
        return;
    }

    if (wishlist.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your wishlist is empty.';
        wishlistSection.appendChild(emptyMessage);
    }

    wishlist.forEach(item => {
        const productCard = createProduct(item);
        const removeBtn = productCard.querySelector('.remove-wishlist-btn');
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
    
            const updatedWishlist = wishlist.filter(p => p.id !== item.id);
            localStorage.setItem(`${currentUser}-wishlist`, JSON.stringify(updatedWishlist));
    
            removeBtn.closest('.product-card').remove();
    
            if (updatedWishlist.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'Your wishlist is empty.';
                wishlistSection.appendChild(emptyMessage);
            }
        });
    
        wishlistSection.appendChild(productCard);
    });
    

    
};


document.addEventListener("DOMContentLoaded", displayWishlist);