import createProduct from "./components/singleProduct.js";

const params = new URLSearchParams(window.location.search);
const showModalBtn = document.getElementById("add-to-cart");   
const addToWishlistBtn = document.getElementById("add-to-wishlist");  
const addToCartBtn = document.getElementById("added-to-cart");   
const quantityInput = document.getElementById("quantity");       
const modal = document.getElementById("cartModal");              
modal.style.display = "none";
const productID = params.get("id");

const fetchProducts = async () => {
    const cacheKey = `product-${productID}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
        console.log("🔁 Loaded single product from cache");
        return JSON.parse(cached);
    }

    try {
        const response = await fetch(`https://dummyjson.com/products/${productID}`);
        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();

        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};


const displayProduct = async () => {
    const product = await fetchProducts();
    const currentUser = localStorage.getItem("currentUser");
    const btn = document.getElementById("add-to-wishlist");

    if (product) {
        createProduct(product);

        const existingWishlist = JSON.parse(localStorage.getItem(`${currentUser}-wishlist`)) || [];
        let existingRecentlyViewed = JSON.parse(localStorage.getItem(`${currentUser}-recently-viewed`)) || [];
        
        const exists = existingWishlist.find(p => p.id === product.id);
        const existingProductIndex = existingRecentlyViewed.findIndex(p => p.id === product.id);
        if (existingProductIndex !== -1) {
            existingRecentlyViewed.splice(existingProductIndex, 1);
            localStorage.setItem(`${currentUser}-recently-viewed`, JSON.stringify(existingRecentlyViewed));
        } 
        existingRecentlyViewed.unshift(product);
        localStorage.setItem(`${currentUser}-recently-viewed`, JSON.stringify(existingRecentlyViewed));

        if (exists) {
            btn.classList.add("heart-active"); 
        }
    }

};


const addToCart = async () => {
    const data = await fetchProducts();
    const quantity = parseInt(quantityInput.value);
    const currentUser = localStorage.getItem("currentUser");

    if (!quantity || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    const productWithQty = { ...data, quantity };

    let existingCart = JSON.parse(localStorage.getItem(`${currentUser}-cart`)) || [];

    const existingProduct = existingCart.find(p => p.id === productWithQty.id);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        existingCart.push(productWithQty);
    }

    localStorage.setItem(`${currentUser}-cart`, JSON.stringify(existingCart));

    alert("Product added to cart!");
    modal.style.display = "none";
    quantityInput.value = 1;
};

const addToWishlist = async () => {
    const data = await fetchProducts();
    const currentUser = localStorage.getItem("currentUser");
    const btn = document.getElementById("add-to-wishlist");

    let existingWishlist = JSON.parse(localStorage.getItem(`${currentUser}-wishlist`)) || [];

    const existingProductIndex = existingWishlist.findIndex(p => p.id === data.id);

    if (existingProductIndex !== -1) {
        existingWishlist.splice(existingProductIndex, 1);
        localStorage.setItem(`${currentUser}-wishlist`, JSON.stringify(existingWishlist));
        btn.classList.remove("heart-active");
    } else {
        existingWishlist.push(data);
        localStorage.setItem(`${currentUser}-wishlist`, JSON.stringify(existingWishlist));
        btn.classList.add("heart-active");
    }
};



showModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

addToCartBtn.addEventListener("click", addToCart);
addToWishlistBtn.addEventListener("click", addToWishlist);

document.addEventListener("DOMContentLoaded", displayProduct);
