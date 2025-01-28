class InvoiceManager {
  constructor() {
    this.invoices = [];
  }

  // Add a new invoice
  addInvoice(invoice) {
    if (
      !invoice.id ||
      !invoice.client ||
      !invoice.date ||
      typeof invoice.amount !== "number"
    ) {
      throw new Error("Missing required fields");
    }
    if (isNaN(Date.parse(invoice.date))) {
      throw new Error("Invalid date format");
    }
    if (invoice.amount <= 0) {
      throw new Error("Amount must be a positive number");
    }

    this.invoices.push(invoice);
  }

  // Modify an existing invoice
  modifyInvoice(id, updatedInvoice) {
    const index = this.invoices.findIndex((inv) => inv.id === id);
    if (index === -1) {
      throw new Error("Invoice not found");
    }

    if (
      !updatedInvoice.client ||
      !updatedInvoice.date ||
      typeof updatedInvoice.amount !== "number"
    ) {
      throw new Error("Missing required fields");
    }
    if (isNaN(Date.parse(updatedInvoice.date))) {
      throw new Error("Invalid date format");
    }
    if (updatedInvoice.amount <= 0) {
      throw new Error("Amount must be a positive number");
    }

    this.invoices[index] = { ...this.invoices[index], ...updatedInvoice };
  }

  // Delete an invoice by ID
  deleteInvoice(id) {
    const index = this.invoices.findIndex((inv) => inv.id === id);
    if (index === -1) {
      throw new Error("Invoice not found");
    }

    this.invoices.splice(index, 1);
  }

  // Get an invoice by ID
  getInvoiceById(id) {
    const invoice = this.invoices.find((inv) => inv.id === id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return invoice;
  }

  // Get all invoices
  getInvoices() {
    return this.invoices;
  }
}

module.exports = InvoiceManager;
