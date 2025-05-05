import createProduct from "./components/product.js";

const fetchAPI = async () => {
  const cacheKey = "all-products";
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    console.log("Loaded all products from cache");
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(`https://dummyjson.com/products`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }


    const data = await response.json();

    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return { products: [] };
  }
};

const displayProducts = async () => {
  const { products } = await fetchAPI();
  const productSection = document.getElementById("productSection");
  productSection.innerHTML = "";

  for (const product of products) {
    const productFragment = createProduct(product);
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(productFragment);

    const productCard = tempDiv.querySelector(".product-card");
    productCard.setAttribute("data-category", product.category.toLowerCase());

    // console.log(productCard);

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
    card.style.display = category === "all" || cardCategory === category ? "" : "none";
  });
};

const showProductsSection = (category) => {
  const mainSection = document.getElementById("main");
  const productSection = document.getElementById("productSection");

  mainSection.style.display = "none";
  productSection.style.display = "grid";

  filterByCategory(category);
};

document.getElementById("search").addEventListener("keyup", searchProduct);

document.getElementById("main").addEventListener("click", (e) => {
  if (e.target.classList.contains("category-link")) {
    e.preventDefault();
    const category = e.target.getAttribute("data-category").toLowerCase();

    showProductsSection(category);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await displayProducts();
});
