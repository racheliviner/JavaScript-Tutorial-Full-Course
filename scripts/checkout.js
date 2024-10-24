import { displayTheOrderSummary } from "./checkout/orderSummery.js";
import { displayThePaymentSummary } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";

async function loadCheckoutPage() {
    await loadProducts();
    displayTheOrderSummary();
    displayThePaymentSummary();
}

loadCheckoutPage();
