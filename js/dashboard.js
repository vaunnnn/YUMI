import createProduct from "./components/product.js";

const fetchAPI = async () => {
  let data;
  try {
    const response = await fetch(`https://dummyjson.com/products`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    data = await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
  return data;
};


const displayProducts = async () => {
  const { products } = await fetchAPI();
  const productSection = document.getElementById("productSection");

  for (const product of products) {
    const productFragment = createProduct(product); 
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(productFragment);

    const productCard = tempDiv.querySelector(".product-card"); 
    productCard.setAttribute("data-category", product.category.toLowerCase());

    productSection.appendChild(productCard);
  }
};


const searchProduct = () => {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#productSection .product-card");

  rows.forEach((row) => {
    const productName = row.querySelector(".product-title").textContent.toLowerCase();
    row.style.display = productName.includes(input) ? "" : "none";
  });
};

const filterByCategory = (category) => {
  const productCards = document.querySelectorAll("#productSection .product-card");

  productCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
};

document.getElementById("search").addEventListener("keyup", searchProduct);

document.getElementById("categories").addEventListener("click", (e) => {
  if (e.target.classList.contains("category-link")) {
    e.preventDefault();
    const category = e.target.getAttribute("data-category").toLowerCase();
    filterByCategory(category);
  }
});

document.addEventListener("DOMContentLoaded", displayProducts);
