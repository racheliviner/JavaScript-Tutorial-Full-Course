import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId){
    let itemExist;
  
    cart.forEach(cartItem => {
      if (productId === cartItem.id){
        cartItem.quantity++;
        itemExist = true; 
      }   
    }); 
  
    if (!itemExist){
      cart.push({
        id: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
  }

export function removeFromCart(productIndex){
    cart.splice(productIndex, 1);
    saveToStorage();
}

export function findMatchingItem(cartItemId) {
  let matchingItem;
  products.forEach(product => {
      if (cartItemId === product.id)
          matchingItem = product;
  })
  return matchingItem;
}

export function updateDeliveryOption(productId, deliveryOptionId){
  cart.forEach(cartItem => {
    if (productId === cartItem.id){
      cartItem.deliveryOptionId = deliveryOptionId;
    }   
  });

  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}