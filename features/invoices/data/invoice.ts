import { Invoice } from "../types"

export const mockInvoices: Invoice[] = [
  {
    id: "RT3080",
    clientName: "Jensen Huang",
    clientEmail: "jensenh@example.com",
    clientAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    description: "Re-branding",
    paymentTerms: 30,
    invoiceDate: "2021-07-20",
    paymentDue: "2021-08-19",
    items: [
      { id: "item-1", name: "Brand Guidelines", quantity: 1, price: 1800.90 }
    ],
    total: 1800.90,
    status: "paid",
  },
  {
    id: "XM9141",
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    clientAddress: { street: "84 Church Way", city: "Bradford", postCode: "BD1 9PB", country: "United Kingdom" },
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    description: "Graphic Design",
    paymentTerms: 30,
    invoiceDate: "2021-08-21",
    paymentDue: "2021-09-20",
    items: [
      { id: "item-2", name: "Banner Design", quantity: 1, price: 156.00 },
      { id: "item-3", name: "Email Design", quantity: 2, price: 200.00 }
    ],
    total: 556.00,
    status: "pending",
  },
  {
    id: "FV2353",
    clientName: "Anita Wainwright",
    clientEmail: "anita@example.com",
    clientAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
    description: "Logo Design",
    paymentTerms: 30,
    invoiceDate: "2021-10-13",
    paymentDue: "2021-11-12",
    items: [
      { id: "item-4", name: "Logo Concepts", quantity: 1, price: 3102.04 }
    ],
    total: 3102.04,
    status: "draft",
  },
];
