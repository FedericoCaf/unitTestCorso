class Cart {
    constructor() {
      this.items = [];
    }
  
    addProduct(product) {
      if (!product.id || !product.name || !product.price || product.quantity < 1) {
        throw new Error("Dati prodotto non validi");
      }
      
      const existingProduct = this.items.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.items.push({ ...product });
      }
    }
  
    removeProduct(productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index === -1) {
        throw new Error("Prodotto non trovato");
      }
      
      if (this.items[index].quantity > 1) {
        this.items[index].quantity -= 1;
      } else {
        this.items.splice(index, 1);
      }
    }
  
    getCart() {
      return this.items;
    }
  
    getTotal() {
      const total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return total > 100 ? total * 0.9 : total; // Applica sconto del 10% sopra i 100€
    }
  
    clearCart() {
      this.items = [];
    }
  }
  
  module.exports = Cart;
  