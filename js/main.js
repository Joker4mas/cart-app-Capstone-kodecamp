

// document.addEventListener('DOMContentLoaded', function() {
//     let products = document.querySelector(".featured-products");
//     async function fetchProducts(url){
//         let productData = await fetch(url);
//         let res = await productData.json();

//         for (let i=0; i<=array.length; i++){
//             let description = response[i].description
//              products.innerHTML +=`
//              <div class="container featured-product">
//              <img src="" alt="${response[i].images[1]}" />
//             <h2 class="product-title">${response[1].title}</h2>
//             <h4 class="product-category">${response[i].category.name}</h4>
//             <h3 class="product-description">${description.length > 20 ? description.substring(0, 20).concat('....more')
//                 : description}
//              </h3>
//             }}</h3>
//              <div class="product-container">
//             <h3 class="product-price">${response[i].price}</h3>
//             <a href="#" data-productId="${response[i].id}" class="addTo-cart"></a>
//             <div class="price " id="featured-products"></div>
//             </div>
//              ;
//         }

//     }
//     fetchProducts("https://api.escuelajs.co/api/v1/products");
//     fetch('https://fakestoreapi.com/products')
//             .then(res => res.json())
//             .then(json=>console.log(json)
// });


// const newData = [];

//  function  getData (){
//     fetch("https://jsonplaceholder.typicode.com/posts")
//     .then(res => res.json())
//     .then((data) => {
//         newData = data;
//         console.log(newData);
//     })
// }


// function addListItems (){
    
// }


//testing code
// Define the API endpoint
const API_URL = 'https://fakeapi.platzi.com/';

// Fetch products from the API and display them on the landing page
async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}products`);
    const products = await response.json();
    displayFeaturedProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display featured products on the landing page
function displayFeaturedProducts(products) {
  const featuredProductsContainer = document.getElementById('featured-products');
  products.slice(0, 6).forEach(product => {
    const productCard = `
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
            <a href="product.html?id=${product.id}" class="btn btn-primary">View Product</a>
          </div>
        </div>
      </div>
    `;
    featuredProductsContainer.innerHTML += productCard;
  });
}

// Display product details on the individual product page
async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`${API_URL}products/${productId}`);
    const product = await response.json();
    displayProductDetails(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
}

function displayProductDetails(product) {
  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-price').textContent = `$${product.price}`;
  const productImages = document.getElementById('product-images');
  product.images.forEach(image => {
    const imgElement = `<img src="${image}" class="img-fluid mb-3" alt="${product.title}">`;
    productImages.innerHTML += imgElement;
  });

  // Add event listener to the "Add to Cart" button
  document.getElementById('add-to-cart').addEventListener('click', () => {
    addToCart(product);
  });
}

// Add product to the cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartItemCount();
}

// Update cart item count in the header
function updateCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemCount = cart.reduce((total, product) => total + product.quantity, 0);
  document.querySelector('.cart-icon .badge').textContent = cartItemCount;
}

// Display cart items on the cart page
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    let cartContent = '';
    let subtotal = 0;

    cart.forEach(product => {
      subtotal += product.price * product.quantity;
      cartContent += `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <img src="${product.images[0]}" alt="${product.title}" class="img-fluid" style="width: 50px;">
            <span>${product.title} (x${product.quantity})</span>
          </div>
          <span>$${(product.price * product.quantity).toFixed(2)}</span>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = cartContent;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  }
}

// Handle checkout page - displaying order summary
function displayOrderSummary() {
  const orderSummaryContainer = document.getElementById('order-summary');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    orderSummaryContainer.innerHTML = '<p>No items in your order.</p>';
  } else {
    let orderContent = '';
    let total = 0;

    cart.forEach(product => {
      total += product.price * product.quantity;
      orderContent += `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span>${product.title} (x${product.quantity})</span>
          </div>
          <span>$${(product.price * product.quantity).toFixed(2)}</span>
        </div>
      `;
    });

    orderSummaryContainer.innerHTML = orderContent;
    document.getElementById('subtotal').textContent = `$${total.toFixed(2)}`;
  }
}

// Helper function to get URL query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Initialize landing page
if (document.getElementById('featured-products')) {
  fetchProducts();
}

// Initialize product page
const productId = getQueryParam('id');
if (productId) {
  fetchProductDetails(productId);
}

// Initialize cart page
if (document.getElementById('cart-items')) {
  displayCartItems();
}

// Initialize checkout page
if (document.getElementById('order-summary')) {
  displayOrderSummary();
}

// Update cart item count on all pages
updateCartItemCount();




