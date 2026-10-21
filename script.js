/* =========================================
   CARNEMANÍA - CARRITO
========================================= */

const WHATSAPP_NUMBER = "59894699373";


/* =========================================
   MENSAJES SUPERIORES
========================================= */

const announcements = [
    "Hacé tu pedido",
    "Los mejores cortes al mejor precio",
    "Disfrutá de un buen asado",
    "Abastecimiento de calidad para tu negocio"
];

let announcementIndex = 0;

const announcementText =
    document.getElementById("announcementText");


function changeAnnouncement() {

    if (!announcementText) return;

    announcementText.style.opacity = "0";

    setTimeout(() => {

        announcementIndex++;

        if (announcementIndex >= announcements.length) {
            announcementIndex = 0;
        }

        announcementText.textContent =
            announcements[announcementIndex];

        announcementText.style.opacity = "1";

    }, 300);
}


setInterval(changeAnnouncement, 5000);

/* =========================================
   UBICACIÓN / ENVÍOS
========================================= */

const deliveryMessages = [
    "🚚 Envíos a domicilio",
    "📍 Ciudad del Plata",
    "📍 Playa Pascual",
    "📍 Consulta en tu zona"
];

let deliveryIndex = 0;

const deliveryText =
    document.getElementById("deliveryText");


function changeDeliveryMessage() {

    if (!deliveryText) return;

    deliveryText.style.opacity = "0";

    setTimeout(() => {

        deliveryIndex++;

        if (deliveryIndex >= deliveryMessages.length) {
            deliveryIndex = 0;
        }

        deliveryText.textContent =
            deliveryMessages[deliveryIndex];

        deliveryText.style.opacity = "1";

    }, 300);
}


setInterval(changeDeliveryMessage, 3500);

/* =========================================
   CARRITO
========================================= */

let cart = [];


/* =========================================
   AGREGAR PRODUCTO
========================================= */

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    openCart();
}


/* =========================================
   CAMBIAR CANTIDAD
========================================= */

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

function removeProduct(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();
}


/* =========================================
   ACTUALIZAR CARRITO
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    const whatsappButton =
        document.getElementById("whatsappButton");


    if (!cartItems) return;


    /* Carrito vacío */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>🛒</div>
                <p>Tu carrito está vacío.</p>
            </div>
        `;

        if (cartCount) {
            cartCount.textContent = "0";
        }

        if (cartTotal) {
            cartTotal.textContent = "$0";
        }

        if (whatsappButton) {
            whatsappButton.disabled = true;
        }

        return;
    }


    /* Crear productos */

    let html = "";

    let total = 0;

    let totalItems = 0;


    cart.forEach((product, index) => {

        const subtotal =
            product.price * product.quantity;

        total += subtotal;

        totalItems += product.quantity;


        html += `
            <div class="cart-item">

                <div class="cart-item-top">

                    <div>

                        <h4>
                            ${product.name}
                        </h4>

                        <div class="cart-item-price">
                            $${product.price.toLocaleString("es-UY")} / kg
                        </div>

                    </div>

                    <strong>
                        $${subtotal.toLocaleString("es-UY")}
                    </strong>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>


                    <span>
                        ${product.quantity} kg
                    </span>


                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>


                    <button
                        class="remove-button"
                        onclick="removeProduct(${index})"
                    >
                        Eliminar
                    </button>

                </div>

            </div>
        `;
    });


    cartItems.innerHTML = html;


    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cartTotal) {
        cartTotal.textContent =
            "$" + total.toLocaleString("es-UY");
    }

    if (whatsappButton) {
        whatsappButton.disabled = false;
    }
}


/* =========================================
   ABRIR CARRITO
========================================= */

function openCart() {

    const cartElement =
        document.getElementById("cart");

    const overlay =
        document.getElementById("cartOverlay");


    if (cartElement) {
        cartElement.classList.add("active");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";
}


/* =========================================
   CERRAR CARRITO
========================================= */

function closeCart() {

    const cartElement =
        document.getElementById("cart");

    const overlay =
        document.getElementById("cartOverlay");


    if (cartElement) {
        cartElement.classList.remove("active");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

    document.body.style.overflow = "";
}


/* =========================================
   WHATSAPP
========================================= */

function sendWhatsApp() {

    if (cart.length === 0) {
        return;
    }


    let message =
        "Hola! Quiero:%0A%0A";


    cart.forEach(product => {

        message +=
            `• ${product.quantity} kg de ${product.name}%0A`;

    });


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================
   INICIAR
========================================= */

updateCart();
