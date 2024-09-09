let cart = []; // Declare only once at the top

const hardcodedProducts = [
/*    {
        name: 'Samsung Galaxy S24 Dual SIM Onyx Black 8GB RAM 128GB 5G',
        price: 2250.00,
        image: 'https://f.nooncdn.com/p/pnsku/N70035139V/45/_/1712239198/07406ec3-81f5-4ee2-b1db-7da849917605.jpg?format=avif&width=240'
    },
    
    {
        name: 'Vivo Y85 Dual SIM Pearl Black 128GB 6GB RAM 4G LTE',
        price: 200.00,
        image: 'images/vivoy85.jpg?format=avif&width=100'
    }*/
];

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById('product-list');

    // Function to handle product fetching and rendering on page load
    async function fetchProducts() {
        // Try to fetch products from API; use hardcoded fallback if unsuccessful
        try {
            const response = await fetch('https://rees.greygladyreigh.workers.dev/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();  // Convert response to JSON
            console.log('Fetched result:', result);  // Debugging log

            // Create product objects using necessary data from the API
            const fetchedProducts = result.data.map(product => ({
                name: product.name,
                price: product.price,
                image: product.image_url
            }));

            // Check if fetchedProducts array contains valid products
            if (Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
                // Combine fetched products with hardcoded ones and sort by price
                const allProducts = fetchedProducts.concat(hardcodedProducts);
                allProducts.sort((a, b) => a.price - b.price);  // Sort low to high
                renderProducts(allProducts);  // Pass sorted products to render function
            } else {
                // Fallback to hardcoded products if fetchedProducts is empty
                console.error('Fetched products is not an array or is empty:', fetchedProducts);
                hardcodedProducts.sort((a, b) => a.price - b.price);  // Sort hardcoded products
                renderProducts(hardcodedProducts);  // Render fallback hardcoded products
            }
        } catch (error) {
            console.error('Error fetching products:', error);  // Log error if API fails
            hardcodedProducts.sort((a, b) => a.price - b.price);  // Sort fallback products
            renderProducts(hardcodedProducts);  // Render fallback products
        }
    }

    // Function to render products in the DOM
    function renderProducts(products) {
        productList.innerHTML = ''; // Clear existing content

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price-container">
                    <p class="price">${product.price.toFixed(2)} AED</p>
                </div>
                <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            `;

            productList.appendChild(productDiv);
        });
    }

    // Load products on page load
    fetchProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    // Function to filter products based on search query
    function searchProducts() {
        const query = document.getElementById('search-bar').value.toLowerCase();
        const products = document.querySelectorAll('#product-list .product');

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            product.style.display = productName.includes(query) ? '' : 'none';
        });
    }

    // Function to sort products
    function sortProducts(order) {
        const productsArray = Array.from(document.querySelectorAll('#product-list .product'));
        const productList = document.getElementById('product-list');

        productsArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent);
            const priceB = parseFloat(b.querySelector('.price').textContent);
            return order === 'low-to-high' ? priceA - priceB : priceB - priceA;
        });

        productList.innerHTML = '';
        productsArray.forEach(product => productList.appendChild(product));
    }

    // Add event listener to the search bar
    document.getElementById('search-bar').addEventListener('keyup', searchProducts);

    // Add event listener to sort options
    document.getElementById('sort-options').addEventListener('change', (event) => {
        if (event.target.value !== 'default') {
            sortProducts(event.target.value);
        }
    });

    // Sort products by default when the page loads
    const defaultSortOrder = 'low-to-high'; // Ensure this matches your default option value
    sortProducts(defaultSortOrder);
});




    // Existing functionality...

var navlinks = document.getElementById("nav-links");


// Hamburger menu functionality
function openMenu() {
    document.getElementById('nav-links').style.right = '0';
    document.querySelector('.close-icon').style.display = 'block';
    document.querySelector('.fas.fa-bars.hamburger').style.display = 'none';
}
 
function closeMenu() {
    document.getElementById('nav-links').style.right = '-200px';
    document.querySelector('.close-icon').style.display = 'none';
    document.querySelector('.fas.fa-bars.hamburger').style.display = 'block';
}


function isLaptop() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent.toLowerCase();
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return width > 1024 && height > 600 && !/android|iphone|ipad|ipod|opera mini|iemobile|windows phone/i.test(userAgent) && !hasTouch;
}

function checkScreenSize() {
    const hamburger = document.querySelector('.fas.fa-bars.hamburger');
    if (isLaptop()) {
        hamburger.classList.add('hidden');
        hamburger.style.position = 'absolute'; // Reset to absolute for laptop
        hamburger.style.top = 'auto'; // Reset any inline top values
        hamburger.style.right = 'auto'; // Reset any inline right values
    } else {
        hamburger.classList.remove('hidden');
        hamburger.style.position = 'fixed'; // Set to fixed for mobile
        hamburger.style.top = '10px'; // Set appropriate top value
        hamburger.style.right = '10px'; // Set appropriate right value
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkScreenSize();

    let resizeTimeout;
    function debounceResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            checkScreenSize();
        }, 200); // Adjust delay as needed
    }

    window.addEventListener('resize', debounceResize);
});


    
    
// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    
    notification.classList.add('show');

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
 
// Function to add item to cart
function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    updateCart();
    updateCartCount();
    showNotification(`${productName} added to cart`);
}

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('cart-item');
        productItem.innerHTML = `
            <p>${product.name} - ${product.price.toFixed(2)} AED</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(productItem);
        total += product.price;
    });

    document.getElementById('total').innerText = `Total: ${total.toFixed(2)} AED`;
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    updateCartCount();
}

// Function to update cart count in navigation bar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cartCountHamburgerElement = document.getElementById('cart-count-hamburger');
    
    if (cart.length === 0) {
        cartCountElement.classList.add('empty');
        cartCountHamburgerElement.classList.add('empty');
        cartCountElement.textContent = "";
        cartCountHamburgerElement.textContent = ""; 
    } else {
        cartCountElement.classList.remove('empty');
        cartCountHamburgerElement.classList.remove('empty');
        cartCountElement.classList.add('not-empty');
        cartCountHamburgerElement.classList.add('not-empty'); 
        cartCountElement.textContent = cart.length;    
        cartCountHamburgerElement.textContent = cart.length;
    }
}

// Event listener for clicking on "Checkout" button
document.getElementById('checkout').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default action to stop any form submission or link navigation
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('checkout-form').style.display = 'block';
        const checkoutForm = document.getElementById('checkout-form');
        const offsetTop = checkoutForm.getBoundingClientRect().top + window.scrollY; // Calculate the absolute position
        window.scrollTo({ top: offsetTop, behavior: 'smooth' }); // Use smooth scrolling
    }
});

// Event listener for clicking on "Cart" link in navigation bar
document.getElementById('cart-link').addEventListener('click', function(event) {
    event.preventDefault();
    const cartSection = document.getElementById('cart');
    const offsetTop = cartSection.getBoundingClientRect().top + window.scrollY; // Calculate the absolute position
    window.scrollTo({ top: offsetTop, behavior: 'smooth' }); // Use smooth scrolling
});

// Add an event listener to handle payment method change and show/hide PayPal button
document.getElementById('payment-method').addEventListener('change', function(event) {
    const paymentMethod = event.target.value;
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    
    if (paymentMethod === 'paypal') {
        paypalButtonContainer.style.display = 'block';
        if (!paypalButtonContainer.innerHTML) { // Check if PayPal button is already rendered
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: convert_aed_usd()
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        completeCheckout(details, true); // Pass true indicating PayPal payment
                    });
                },
                onError: function(err) {
                    console.error('PayPal Checkout error:', err);
                    alert('There was an error processing the payment. Please try again.');
                },
                onCancel: function(data) {
                    alert('Payment was canceled.');
                }
            }).render('#paypal-button-container');
        }
    } else {
        paypalButtonContainer.style.display = 'none';
    }
});

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const paymentMethod = document.getElementById('payment-method').value;

    if (paymentMethod !== 'paypal') {
        document.getElementById('paypal-button-container').style.display = 'none'; // Hide PayPal button container
        completeCheckout({ id: 'Cash Payment', payer: { name: { given_name: 'Cash Payment' } } }, false); // Pass false indicating non-PayPal payment
    } else {
        alert('PayPal / Card Transaction Not Yet Completed');
    }
});

document.getElementById('back-to-cart').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default action to stop any form submission or link navigation
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    paypalButtonContainer.style.display = 'none';  // Hide PayPal button
    paypalButtonContainer.innerHTML = '';  // Clear the PayPal button content to ensure it can be rendered fresh next time
    const cartSection = document.getElementById('cart');
    const offsetTop = cartSection.getBoundingClientRect().top + window.scrollY; // Calculate the absolute position
    window.scrollTo({ top: offsetTop, behavior: 'smooth' }); // Use smooth scrolling
});

// Function to send email
async function sendEmail(to, message, orderNumber) {
    const smtpEndpoint = 'https://api.smtp2go.com/v3/email/send';  // Verify the correct endpoint
    const apiKey = 'api-AF4BE98C43FF422EAC600E6C9CF3C5C8';  // Replace with your actual API key
    const fromName = 'PhoneSale';  // Desired sender name
    const fromEmail = 'support@phonesale.org';

    const body = JSON.stringify({
        api_key: apiKey,
        to: [to, 'grey@phonesale.org'],
        sender: `${fromName} <${fromEmail}>`,  // Construct the sender with name and email
        subject: 'Order Confirmation: ' + orderNumber,
        html_body: message,
    });

    console.log('Request body:', body);  // Log request body for debugging

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };

    const response = await fetch(smtpEndpoint, init);
    return response;
}

// Function to generate order number
function generateOrderNumber(length = 6) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to calculate the total amount
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
}

function convert_aed_usd() {
    return (cart.reduce((total, product) => total + parseFloat(product.price), 0) / 3.63).toFixed(2);
}

// Function to complete checkout after payment
function completeCheckout(details, isPaypal) {
    if (isPaypal || confirm('Proceed with "cash" payment?')) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const mobile = document.getElementById('mobile').value;
        const items = cart.map(item => `${item.name} - ${item.price.toFixed(2)} AED`);
        const orderNumber = generateOrderNumber();

        const message = `
            <html>
            <head>
                <title>Order Confirmation: ${orderNumber}</title>
            </head>
            <body>
                <h1>Order Confirmation</h1>
                <p>Thank you for your order, ${name}.</p>
                <p><strong>Order Number:</strong> ${orderNumber}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Items:</strong> ${items.join(', ')}</p>
                <p><strong>Transaction Method:</strong> ${details.id}</p>
            </body>
            </html>
        `;

        sendEmail(email, message, orderNumber)
            .then(response => {
                console.log('Response status:', response.status);  // Log status code
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);  // Log the full response for debugging
                if (data && data.data) {
                    if (data.data.failures && data.data.failures.length > 0) {
                        alert('There was an error placing the order: ' + (data.data.failures[0].message || 'Unknown error'));
                    } else if (data.data.succeeded > 0) {
                        alert(`Order placed! Email sent. Your order number is ${orderNumber}.`);
                        cart = [];
                        updateCart();
                        updateCartCount();
                        document.getElementById('checkout-form').style.display = 'none';
                        document.getElementById('cart').style.display = 'block';
                        const cartSection = document.getElementById('cart');
                        const offsetTop = cartSection.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    } else {
                        alert('There was an unknown error placing the order.');
                    }
                } else {
                    alert('Unexpected response structure.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error placing the order. Please try again later.');
            });
    }
}

// JavaScript to show WhatsApp contact button after scrolling
window.addEventListener('scroll', function() {
    var whatsappContact = document.getElementById('whatsapp-contact');
    var footer = document.querySelector('footer');
    var footerTop = footer.getBoundingClientRect().top;

    // Adjust visibility based on scroll position and footer position
    if (window.scrollY > 200 && footerTop > window.innerHeight - whatsappContact.clientHeight) {
        whatsappContact.style.display = 'block';
    } else {
        whatsappContact.style.display = 'none';
    }
});

window.addEventListener('resize', function() {
    var whatsappContact = document.getElementById('whatsapp-contact');
    var footer = document.querySelector('footer');
    var footerTop = footer.getBoundingClientRect().top;

    // Adjust visibility on resize (e.g., mobile orientation change)
    if (window.innerWidth <= 768) {
        whatsappContact.style.display = 'block';
    } else {
        if (window.scrollY > 200 && footerTop > window.innerHeight - whatsappContact.clientHeight) {
            whatsappContact.style.display = 'block';
        } else {
            whatsappContact.style.display = 'none';
        }
    }
});




// Event listener for "Back" button
document.getElementById('back-to-cart').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default action to stop any form submission or link navigation
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    document.getElementById('paypal-button-container').style.display = 'none';  // Hide PayPal button
    const cartSection = document.getElementById('cart');
    const offsetTop = cartSection.getBoundingClientRect().top + window.scrollY; // Calculate the absolute position
    window.scrollTo({ top: offsetTop, behavior: 'smooth' }); // Use smooth scrolling
});


