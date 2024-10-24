import { displayTheOrderSummary } from "./checkout/orderSummery.js";
import { displayThePaymentSummary } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";

loadProducts(() => {
    displayTheOrderSummary();
    displayThePaymentSummary();
});
