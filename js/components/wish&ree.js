const createProduct = (product) => {
    const productTemplate = document.getElementById('product-template');
    const productCard = productTemplate.content.cloneNode(true);
    const productLink = productCard.querySelector('.product-card');
    const productImage = productCard.querySelector('.product-image');
    const productTitle = productCard.querySelector('.product-title');
    const productPrice = productCard.querySelector('.product-price');
    const productId = productCard.querySelector('.id');

    const {id, images, title, price} = product;

    productLink.href = `/html/product.html?id=${id}`;
    productImage.src = images[0] || ''; 
    productImage.alt = title || 'Product image';
    productTitle.textContent = title || 'Product Name';
    productPrice.textContent = `$${price || '0.00'}`;
    productId.textContent = `ID: ${id || 'N/A'}`;

    
    return productCard;
}

export default createProduct;