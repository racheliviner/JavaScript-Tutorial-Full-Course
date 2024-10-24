import { displayTheOrderSummary } from "./checkout/orderSummery.js";
import { displayThePaymentSummary } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";

async function loadCheckoutPage() {
    try {
        await loadProducts();
    } 
    
    catch (error) {
        alert (
            `Unexpected error while loading the products from the Backend.
            Please try again later.`
          );
    }

    displayTheOrderSummary();
    displayThePaymentSummary();
}

loadCheckoutPage();
