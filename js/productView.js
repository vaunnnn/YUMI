import createProduct from "./components/singleProduct.js";

const params = new URLSearchParams(window.location.search);
const showModalBtn = document.getElementById("add-to-cart");   
const addToCartBtn = document.getElementById("added-to-cart");   
const quantityInput = document.getElementById("quantity");       
const modal = document.getElementById("cartModal");              
modal.style.display = "none";
const productID = params.get("id");

const fetchProducts = async () => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productID}`);
        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};

const displayProduct = async () => {
    const product = await fetchProducts();
    if (product) {
        createProduct(product);
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

showModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
});

addToCartBtn.addEventListener("click", addToCart);


document.addEventListener("DOMContentLoaded", displayProduct);
