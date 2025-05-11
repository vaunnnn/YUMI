import createProduct from "./components/wish&ree.js";

const displayWishlist = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No user logged in.");
        window.location.href = "/html/signin.html";
        return; // Add return to stop execution
    }

    // Retrieve wishlist and ensure it's an array
    const wishlist = JSON.parse(localStorage.getItem(`${currentUser}-wishlist`)) || [];
    const wishlistSection = document.querySelector('.wishlistSection');

    if (!wishlistSection) {
        console.error('Wishlist section not found.');
        return;
    }

    wishlistSection.innerHTML = ''; 

    if (wishlist.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your wishlist is empty.';
        wishlistSection.appendChild(emptyMessage);
    } else {
        wishlist.forEach(item => {
            const productCard = createProduct(item);
            const removeBtn = productCard.querySelector('.remove-wishlist-btn');

            if (removeBtn) { 
                removeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const currentWishlistState = JSON.parse(localStorage.getItem(`${currentUser}-wishlist`)) || [];

                    const updatedWishlist = currentWishlistState.filter(p => p.id !== item.id);

                    localStorage.setItem(`${currentUser}-wishlist`, JSON.stringify(updatedWishlist));

                    removeBtn.closest('.product-card').remove();

                    if (updatedWishlist.length === 0) {
                        const emptyMessage = document.createElement('p');
                        emptyMessage.textContent = 'Your wishlist is empty.';
                        wishlistSection.appendChild(emptyMessage);
                    }
                });
            } else {
                console.warn(`Remove button with class '.remove-wishlist-btn' not found in product card for item:`, item);
            }

            wishlistSection.appendChild(productCard);
        });
    }
};

window.addEventListener("DOMContentLoaded", displayWishlist);