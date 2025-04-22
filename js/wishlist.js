document.addEventListener('DOMContentLoaded', function () {
    const currentUser = localStorage.getItem("currentUser"); 
    if (!currentUser) {
        console.error("No user logged in.");
        return;
    }

    const wishlist = JSON.parse(localStorage.getItem(`${currentUser}-wishlist`)) || [];
    const wishlistSection = document.querySelector('.wishlistSection');
    const productTemplate = document.getElementById('product-template');

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
        const productCard = productTemplate.content.cloneNode(true);
        const productLink = productCard.querySelector('.product-card');
        const productImage = productCard.querySelector('.product-image');
        const productTitle = productCard.querySelector('.product-title');
        const productPrice = productCard.querySelector('.product-price');
        const productId = productCard.querySelector('.id');
        const removeBtn = productCard.querySelector('.remove-wishlist-btn');
    
        productLink.href = `/html/product.html?id=${item.id}`;
        productImage.src = item.images[0] || ''; 
        productImage.alt = item.title || 'Product image';
        productTitle.textContent = item.title || 'Product Name';
        productPrice.textContent = `$${item.price || '0.00'}`;
        productId.textContent = `ID: ${item.id || 'N/A'}`;
    
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
    

    
});
