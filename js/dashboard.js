import createProduct from "./components/product.js";

const fetchAPI = async () => {
  const cacheKey = "all-products";
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    console.log("Loaded all products from cache");
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(`https://dummyjson.com/products?limit=0`);
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

// HI SYBEL YADEEN

document.getElementById("search").addEventListener("keyup", searchProduct);

document.getElementById("categories").addEventListener("click", (e) => {
  if (e.target.classList.contains("category-link")) {
    e.preventDefault();
    const category = e.target.getAttribute("data-category").toLowerCase();
    filterByCategory(category);
  }
});

document.addEventListener("DOMContentLoaded", displayProducts);

// SCROLL TRANSITION
const sections = document.querySelectorAll('.photo');
let isScrolling = false;

document.addEventListener('wheel', (event) => {
  if (isScrolling) return;
  isScrolling = true;

  const direction = event.deltaY > 0 ? 1 : -1; 
  const currentScroll = window.scrollY;
  const sectionHeight = window.innerHeight;

  let targetIndex = Math.round(currentScroll / sectionHeight) + direction;

  targetIndex = Math.max(0, Math.min(sections.length - 1, targetIndex));

  const targetPosition = sections[targetIndex].offsetTop;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  setTimeout(() => {
    isScrolling = false;
  }, 700); 
});