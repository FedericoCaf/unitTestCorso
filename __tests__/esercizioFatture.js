const InvoiceManager = require("../utils/invoiceManager/invoiceManager.js");

describe("Invoice Manager", () => {
  let manager;

  // Setup prima di ogni test
  beforeEach(() => {
    manager = new InvoiceManager();
  });

  /*** Test di Validità dei Dati ***/
  describe("Data Validation", () => {
    test("Should throw error if required fields are missing", () => {
      const invalidInvoice = { id: 1, amount: 100 }; // Missing fields
      expect(() => manager.addInvoice(invalidInvoice)).toThrow(
        "Missing required fields"
      );
    });

    test("Should throw error if date is invalid", () => {
      const invalidInvoice = {
        id: 1,
        client: "John Doe",
        date: "invalid-date",
        amount: 100,
      };
      expect(() => manager.addInvoice(invalidInvoice)).toThrow(
        "Invalid date format"
      );
    });

    test("Should throw error if amount is not a positive number", () => {
      const invalidInvoice = {
        id: 1,
        client: "John Doe",
        date: "2025-01-28",
        amount: -100,
      };
      expect(() => manager.addInvoice(invalidInvoice)).toThrow(
        "Amount must be a positive number"
      );
    });
  });

  /*** Test delle Funzionalità CRUD ***/
  describe("CRUD Operations", () => {
    test("Should add a new invoice successfully", () => {
      const newInvoice = {
        id: 1,
        client: "John Doe",
        date: "2025-01-28",
        amount: 100,
      };

      manager.addInvoice(newInvoice);

      expect(manager.getInvoices()).toEqual([newInvoice]);
    });

    test("Should modify an existing invoice successfully", () => {
      const invoice = {
        id: 1,
        client: "John Doe",
        date: "2025-01-28",
        amount: 100,
      };
      manager.addInvoice(invoice);

      const updatedInvoice = {
        id: 1,
        client: "Jane Smith",
        date: "2025-01-29",
        amount: 200,
      };
      manager.modifyInvoice(1, updatedInvoice);

      expect(manager.getInvoices()).toEqual([updatedInvoice]);
    });

    test("Should delete an invoice successfully", () => {
      const invoice = {
        id: 1,
        client: "John Doe",
        date: "2025-01-28",
        amount: 100,
      };
      manager.addInvoice(invoice);

      manager.deleteInvoice(1);

      expect(manager.getInvoices()).toEqual([]);
    });

    test("Should retrieve an invoice by ID", () => {
      const invoice = {
        id: 1,
        client: "John Doe",
        date: "2025-01-28",
        amount: 100,
      };
      manager.addInvoice(invoice);

      expect(manager.getInvoiceById(1)).toEqual(invoice);
    });

    test("Should return all invoices", () => {
      const invoices = [
        { id: 1, client: "John Doe", date: "2025-01-28", amount: 100 },
        { id: 2, client: "Jane Smith", date: "2025-01-29", amount: 200 },
      ];
      invoices.forEach((invoice) => manager.addInvoice(invoice));

      expect(manager.getInvoices()).toEqual(invoices);
    });
  });

  /*** Test di Gestione degli Errori ***/
  describe("Error Handling", () => {
    test("Should throw error when trying to modify a non-existent invoice", () => {
      const updatedInvoice = {
        id: 1,
        client: "Jane Smith",
        date: "2025-01-29",
        amount: 200,
      };

      expect(() => manager.modifyInvoice(1, updatedInvoice)).toThrow(
        "Invoice not found"
      );
    });

    test("Should throw error when trying to delete a non-existent invoice", () => {
      expect(() => manager.deleteInvoice(1)).toThrow("Invoice not found");
    });

    test("Should throw error when trying to retrieve a non-existent invoice", () => {
      expect(() => manager.getInvoiceById(1)).toThrow("Invoice not found");
    });
  });
});
