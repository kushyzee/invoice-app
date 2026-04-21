export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAddress: Address;
  senderAddress: Address;
  description: string;
  paymentTerms: 1 | 7 | 14 | 30;
  invoiceDate: string;
  paymentDue: string;
  items: InvoiceItem[];
  total: number;
  status: "draft" | "pending" | "paid";
}
