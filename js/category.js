import createProduct from "./components/product.js";

const groupedCategories = {
  beauty: ["beauty", "fragrances", "skincare", "skin-care"],
  grocery: ["groceries", "kitchen-accessories"],
  gadgets: ["laptops", "mobile-accessories", "smartphones", "tablets"],
  clothes: ["mens-shirts", "mens-shoes", "tops", "womens-dresses", "womens-shoes"],
  accessories: ["sports-accessories", "sunglasses", "mens-watches", "womens-jewellery", "womens-watches"],
  vehicles: ["motorcycle", "vehicle"],
  furnitures: ["furniture", "home-accessories"]
};

const fetchGroupedCategoryProducts = async (category) => {
  const subcategories = groupedCategories[category.toLowerCase()] || [category];
  let allProducts = [];

  for (const sub of subcategories) {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${sub}`);
      const data = await response.json();
      allProducts = allProducts.concat(data.products);
    } catch (error) {
      console.error(`Error fetching ${sub}:`, error);
    }
  }
  console.log(allProducts);

  return allProducts;
  
};

const displayCategoryProducts = async () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  const productSection = document.getElementById("productSection");
  if (!category || !productSection) return;

  productSection.innerHTML = "";
  productSection.style.display = "grid"; 

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

document.addEventListener("DOMContentLoaded", displayCategoryProducts);
