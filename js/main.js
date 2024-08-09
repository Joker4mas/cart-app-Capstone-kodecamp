

document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector(".featured-products");
    async function fetchProducts(url){
        let productData = await fetch(url);
        let res = await productData.json();

        for (let i=0; i<=array.length; i++){
             products.innerHTML +=`
             <div class="container featured-product">
             <img src="" alt="" />
            <h2 class="product-title"></h2>
            <h3 class="text-center mb-4">Featured Products</h3>
            <div class="row" id="featured-products"></div>
            </div>
             
             
             
             
             `
        }

    }
    fetch("https://api.escuelajs.co/api/v1/products");
})