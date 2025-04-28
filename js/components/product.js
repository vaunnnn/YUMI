const createProduct = (product) => {
    const template = document.getElementById("product-template");
    const clone = template.content.cloneNode(true); 
  
    const anchor = clone.querySelector(".product-card");
    const image = clone.querySelector(".product-image");
    const productTitle = clone.querySelector(".product-title");
    const productPrice = clone.querySelector(".product-price");
    
    const {id, thumbnail, title, price} = product;

    anchor.href = `product.html?id=${id}`;
    image.src = thumbnail;
    image.alt = `Image of ${title}`;
    image.loading = "lazy"; 
    image.onerror = () => {
        image.src = "/images/edwinchan.jpg"; 
        image.alt = "Image not available";
    }
    productTitle.textContent = title;
    productPrice.textContent = `$${price}`;
  
    return clone;
};

  
export default createProduct;

