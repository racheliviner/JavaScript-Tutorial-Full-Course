import { cart, removeFromCart , findMatchingItem, updateDeliveryOption} from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions , findMatchingDeliveryOption} from "../data/deliveryOptions.js";
import { calcDeliveryDate } from "./utils/dates.js";

function DisplayTheOrderSummary() {
    let cartProductsHTML = '';

    cart.forEach((cartItem, cartIndex) => {
        let matchingItem = findMatchingItem(cartItem.id);
        let matchingDeliveryOption = findMatchingDeliveryOption(cartItem.deliveryOptionId);

        cartProductsHTML +=
            `
        <div class="cart-item-container js-cart-item-container-${cartIndex}">
            <div class="delivery-date">
                Delivery date: ${calcDeliveryDate(matchingDeliveryOption.deliveryDays)}
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image"
                src=${matchingItem.image}>
                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingItem.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-index=${cartIndex}>
                            Delete
                        </span>
                    </div>
                </div>
                ${createDeliveryOptionsHTML(cartItem)}
            </div>
        </div>
        `;

    })

    document.querySelector('.js-order-summary')
        .innerHTML = cartProductsHTML;
}

function createDeliveryOptionsHTML(cartItem) {
    let optionsHTML = '';
    deliveryOptions.forEach(deliveryOption => {
        const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryOption.priceCents)} -`;
        const IsChecked = cartItem.deliveryOptionId === deliveryOption.id;

        optionsHTML +=
            `
        <div class="delivery-option js-delivery-option"
            data-product-id = "${cartItem.id}"
            data-delivery-option-id = "${deliveryOption.id}">
            <input type="radio" ${IsChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}">
            <div>
                <div class="delivery-option-date">
                    ${calcDeliveryDate(deliveryOption.deliveryDays)}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `
    });

    let deliveryOptionsHTML =
        `
        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${optionsHTML}    
        </div>
        `;
    return deliveryOptionsHTML;
}

function setupDeleteBtn() {
    document.querySelectorAll('.js-delete-link')
        .forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {

                let productIndex = deleteButton.dataset.productIndex;

                document.querySelector(`.js-cart-item-container-${productIndex}`)
                    .remove();

                removeFromCart(productIndex);
            })
        });
}

DisplayTheOrderSummary();
setupDeleteBtn();

document.querySelectorAll('.js-delivery-option')
.forEach(element => {
    element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
    })
});
