import createProduct from "./components/product.js";

const fetchAPI = async () => {

  let data;
  try {
    const response = await fetch(`https://dummyjson.com/products`);
    
    if(!response.ok) {
      throw new Error(`${response.status}`);
    }

    data = await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
  return data;
}

const displayProducts = async () => {
  const {products} = await fetchAPI();

  const productSection = document.getElementById("productSection");

  for(const product of products) {
    const productCard = createProduct(product);
    productSection.appendChild(productCard);
  }
}

const searchProduct = () => {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#productSection .product-card");

  rows.forEach(row => {
    const productName = row.querySelector(".product-title").textContent.toLowerCase();

    if(productName.includes(input)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

}

document.getElementById("search").addEventListener("keyup", searchProduct);

document.addEventListener("DOMContentLoaded", displayProducts);

