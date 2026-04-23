export interface InvoiceItem {
  id: string
  name: string
  quantity: number
  price: number
}

export interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

export interface Invoice {
  clientName: string
  clientEmail: string
  clientStreet: string
  clientCity: string
  clientPostCode: string
  clientCountry: string
  senderStreet: string
  senderCity: string
  senderPostCode: string
  senderCountry: string
  description: string
  paymentTerms: 1 | 7 | 14 | 30
  invoiceDate: string
  items: InvoiceItem[]
}
