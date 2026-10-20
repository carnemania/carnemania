/* =========================================
   CARNEMANÍA
   Carrito + WhatsApp + mensajes rotativos
========================================= */


/* =========================================
   CONFIGURACIÓN
========================================= */

// Número de WhatsApp del vendedor.
// Uruguay: 598 + número sin el 0 inicial.
const WHATSAPP_NUMBER = "59894699373";


/* =========================================
   MENSAJES DE LA BARRA
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


/*
   Cambia cada 5 segundos.
*/
setInterval(changeAnnouncement, 5000);


/* =========================================
   CARRITO
========================================= */

let cart = [];


/* =========================================
   AGREGAR PRODUCTO
========================================= */

function addToCart(name, price) {

    const existingProduct =
        cart.find(product => product.name === name);


    if (existingProduct) {

        existingProduct.quantity++;

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


    /*
       Si no hay productos.
    */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>🛒</div>
                <p>Tu carrito está vacío.</p>
            </div>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "$0";

        whatsappButton.disabled = true;

        return;
    }


    /*
       Crear HTML de productos.
    */

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


    /*
       Actualizar contador y total.
    */

    cartCount.textContent = totalItems;

    cartTotal.textContent =
        "$" + total.toLocaleString("es-UY");


    whatsappButton.disabled = false;
}


/* =========================================
   ABRIR CARRITO
========================================= */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");


    /*
       Evita que la página de fondo
       siga desplazándose.
    */

    document.body.style.overflow = "hidden";
}


/* =========================================
   CERRAR CARRITO
========================================= */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");


    document.body.style.overflow = "";
}


/* =========================================
   PEDIDO POR WHATSAPP
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

    message +=
        "%0AQuedo atento para coordinar";

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(
        whatsappURL,
        "_blank"
    );
});


    message +=
        `%0ATotal estimado: $${total}%0A%0A`;

    message +=
        "Quedo atento para coordinar el pago por transferencia y la entrega.";


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================
   INICIO
========================================= */

updateCart();
