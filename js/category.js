import createProduct from "./components/product.js";
import { fetchGroupedCategoryProducts } from "./utilities/categoryUtils.js";

const displayCategoryProducts = async () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  const productSection = document.getElementById("productSection");
  if (!category || !productSection) return;

  productSection.innerHTML = "";
  productSection.style.display = "flex";

  const products = await fetchGroupedCategoryProducts(category);

  if (products.length === 0) {
    productSection.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const productElement = createProduct(product);
    productSection.appendChild(productElement);
  });
};

const searchProduct = () => {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#productSection .product-card");

  rows.forEach((row) => {
    const productName = row.querySelector(".product-title").textContent.toLowerCase();
    row.style.display = productName.includes(input) ? "" : "none";
  });
};

document.getElementById("search").addEventListener("keyup", searchProduct);
document.addEventListener("DOMContentLoaded", displayCategoryProducts);

/*========CATEGORY TAB===========*/
document.getElementById("toggle-categories").addEventListener("click", function () {
  const categoryList = document.getElementById("category-list");
  categoryList.classList.toggle("expanded");
});