import convertUsdToPhp from "../utilities/convertUsdToPhp.js";
const createSingleProduct = (product) => {

    const productImage = document.querySelector(".product-image");
    const productStock = document.querySelector(".stock");
    // const productTags = document.querySelector(".tags");

    const productName = document.querySelector(".name");
    const productID = document.querySelector(".id");
    const productPrice = document.querySelector(".price");
    const productRating = document.querySelector(".rating");

    const productDes = document.querySelector(".description");
    const productBrand = document.querySelector(".brand");
    const productCategory = document.querySelector(".category");
    const productWeight = document.querySelector(".weight");
    const productDimensions = document.querySelector(".dimensions");
    const productWarranty = document.querySelector(".warranty");
    const productShipping = document.querySelector(".shipping");

    
    const productReview = document.querySelector(".product-review");

    const {
        title,
        id,
        price,
        rating,
        stock,
        // tags,
        description,
        brand,
        category,
        weight,
        dimensions,
        warrantyInformation,
        shippingInformation,
        images
    } = product;

    productImage.src = images[0];
    productImage.alt = `Image of ${images}`;
    (stock) ? productStock.textContent = `In stock` : productStock.textContent = `No stock`
    
    // if (tags && tags.length > 0) {
    //     tags.forEach(tag => {
    //         const tagElement = document.createElement('div');
    //         tagElement.textContent = tag;
    //         tagElement.classList.add('tag');
    //         productTags.appendChild(tagElement);
    //     });
    // } else {
    //     productTags.textContent = 'No tags available';
    // }

    productName.textContent = title;
    if(brand) {
        productBrand.textContent = `${brand}`;
    } else {
        productBrand.textContent = `Edwin Bartlett`;
    }
    
    productID.textContent = `ID: ${id}`;
    productPrice.textContent = `₱${convertUsdToPhp(price)}`;
    productRating.textContent = `${"★".repeat(rating)}`;

    productDes.textContent = description;
    productCategory.textContent = `Category: ${category}`;
    productWeight.textContent = weight ? `Weight: ${weight}` : '';
    productDimensions.textContent = `Dimensions: ${dimensions.width}W x ${dimensions.height}H x ${dimensions.depth}D`;
    productWarranty.textContent = warrantyInformation ? `Warranty: ${warrantyInformation}` : '';
    productShipping.textContent = shippingInformation ? `Shipping: ${shippingInformation}` : '';

    productReview.innerHTML = "<h3>Customer Reviews</h3>";

    if (product.reviews && product.reviews.length > 0) {
        product.reviews.forEach(review => {
            const reviewHTML = `
                <div class="single-review" style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
                    <p><strong>${review.reviewerName}</strong> (${new Date(review.date).toLocaleDateString()})</p>
                    <p>Rating: ${"★".repeat(review.rating)}</p>
                    <p>"${review.comment}"</p>
                </div>
            `;
            productReview.innerHTML += reviewHTML;
        });
    } else {
        productReview.innerHTML += "<p>No reviews yet.</p>";
    }


}

export default createSingleProduct;