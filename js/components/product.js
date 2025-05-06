import convertUsdToPhp from "../utilities/convertUsdToPhp.js";

const template = document.getElementById("product-template");
const createProduct = (product) => {
    // const template = document.getElementById("product-template");


    const clone = template.content.cloneNode(true);

    const anchor = clone.querySelector(".product-card");
    const image = clone.querySelector(".product-image");
    const productTitle = clone.querySelector(".product-title");
    const productPrice = clone.querySelector(".product-price");
    const loader = clone.querySelector('.loader');

    const { id, thumbnail, title, price } = product;

    {
        const maxRetries = 5;
        const retryDelay = 2000;
        let currentTry = 0;
        let tempImg = new Image();
        fetchImage({thumbnail, loader, image, tempImg, maxRetries, retryDelay, currentTry});
    }


    anchor.href = `product.html?id=${id}`;
    productTitle.textContent = title;
    productPrice.textContent = `₱` + convertUsdToPhp(price);

    // console.log(anchor.length);

    return clone;
};


const fetchImage = (params) => {

    const {thumbnail, loader, image, tempImg, maxRetries, retryDelay, currentTry} = params

    tempImg.onload = () => {
        image.src = thumbnail;
        loader.style.display = 'none';
    }

    tempImg.onerror = () => {
        currentTry++;

        if (currentTry < maxRetries) {
            setTimeout(()=> fetchImage(params), retryDelay);
        } else {
            image.src = "../../images/edwinchan.png"
        }

    }

    tempImg.src = thumbnail;


}

export default createProduct;

