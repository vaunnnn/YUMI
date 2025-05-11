const groupedCategories = {
  beauty: ["beauty", "fragrances", "skincare", "skin-care"],
  grocery: ["groceries", "kitchen-accessories"],
  gadgets: ["laptops", "mobile-accessories", "smartphones", "tablets"],
  clothes: ["mens-shirts", "mens-shoes", "tops", "womens-dresses", "womens-shoes"],
  accessories: ["sports-accessories", "sunglasses", "mens-watches", "womens-jewellery", "womens-watches"],
  vehicles: ["motorcycle", "vehicle"],
  furnitures: ["furniture", "home-accessories"]
};
/** 
* @param {string} category 
* @returns {Promise<Array>} 
*/

const fetchGroupedCategoryProducts = async (category) => {
  const subcategories = groupedCategories[category.toLowerCase()] || [category];
  let allProducts = [];

  for (const sub of subcategories) {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${sub}`);
      if (!response.ok) {
        console.error(`HTTP error fetching ${sub}: ${response.status}`);
        continue; // Skip to the next subcategory on error
      }
      const data = await response.json();
      allProducts = allProducts.concat(data.products);
    } catch (error) {
      console.error(`Error fetching ${sub}:`, error);
    }
  }
  // console.log(allProducts); // Consider removing this console.log in production
  return allProducts;
};

// Export the function and potentially the groupedCategories object if needed elsewhere
export { fetchGroupedCategoryProducts, groupedCategories };