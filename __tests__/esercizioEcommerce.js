const Cart = require("../ecommerce/cart");

describe("Cart Unit Tests", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  xtest("Aggiunta di un nuovo prodotto", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    expect(cart.getCart()).toEqual([
      { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
    ]);
  });

  xtest("Aggiunta di un prodotto già presente (incremento quantità)", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    expect(cart.getCart()).toEqual([
      { id: 1, name: "Laptop", price: 999.99, quantity: 2 },
    ]);
  });

  xtest("Rimozione di un prodotto esistente", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 2 });
    cart.removeProduct(1);
    expect(cart.getCart()).toEqual([
      { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
    ]);
  });

  xtest("Svuotamento del carrello", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    cart.clearCart();
    expect(cart.getCart()).toEqual([]);
  });

  xtest("Calcolo del totale con sconto sopra 100€", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 120, quantity: 1 });
    expect(cart.getTotal()).toBe(108); // 10% di sconto applicato
  });
});

describe("Cart Integration Tests", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  xtest("Aggiunta e rimozione di più prodotti e calcolo totale", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 50, quantity: 2 });
    cart.addProduct({ id: 2, name: "Mouse", price: 20, quantity: 1 });
    cart.removeProduct(1);
    expect(cart.getTotal()).toBe(70); // 50 * 1 + 20 * 1
  });

  xtest("Verifica dello sconto non applicato esattamente a 100€", () => {
    cart.addProduct({ id: 1, name: "Monitor", price: 100, quantity: 1 });
    expect(cart.getTotal()).toBe(100); // Nessuno sconto applicato
  });

  xtest("Svuotamento del carrello e verifica totale aggiornato", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 150, quantity: 1 });
    cart.clearCart();
    expect(cart.getTotal()).toBe(0);
  });
});
