const Cart = require("../ecommerce/cart");

describe("Cart Unit Tests", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test("Aggiunta di un nuovo prodotto", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    expect(cart.getCart()).toEqual([
      { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
    ]);
  });

  test("Aggiunta di un prodotto già presente (incremento quantità)", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    expect(cart.getCart()).toEqual([
      { id: 1, name: "Laptop", price: 999.99, quantity: 2 },
    ]);
  });

  test("Rimozione di un prodotto esistente", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 2 });
    cart.removeProduct(1);
    expect(cart.getCart()).toEqual([
      { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
    ]);
  });

  test("Svuotamento del carrello", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
    cart.clearCart();
    expect(cart.getCart()).toEqual([]);
  });

  test("Calcolo del totale con sconto sopra 100€", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 120, quantity: 1 });
    expect(cart.getTotal()).toBe(108); // 10% di sconto applicato
  });
});

describe("Cart Integration Tests", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test("Aggiunta e rimozione di più prodotti e calcolo totale", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 50, quantity: 2 });
    cart.addProduct({ id: 2, name: "Mouse", price: 20, quantity: 1 });
    cart.removeProduct(1);
    expect(cart.getTotal()).toBe(70); // 50 * 1 + 20 * 1
  });

  test("Verifica dello sconto non applicato esattamente a 100€", () => {
    cart.addProduct({ id: 1, name: "Monitor", price: 100, quantity: 1 });
    expect(cart.getTotal()).toBe(100); // Nessuno sconto applicato
  });

  test("Svuotamento del carrello e verifica totale aggiornato", () => {
    cart.addProduct({ id: 1, name: "Laptop", price: 150, quantity: 1 });
    cart.clearCart();
    expect(cart.getTotal()).toBe(0);
  });
});
