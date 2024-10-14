export const cart = [];

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
        quantity: 1
      });
    } 
  }