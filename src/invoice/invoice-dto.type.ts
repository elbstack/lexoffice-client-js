import { Required } from 'utility-types';
import {
  Invoice,
  InvoiceForCreate,
  AddressExistingLexofficeContact,
  CustomLineItemXRechnung,
  TextLineItem,
} from './invoice.type';

//  Create an Invoice
export type InvoiceCreate = Required<
  Partial<InvoiceForCreate>,
  'voucherDate' | 'address' | 'lineItems' | 'totalPrice' | 'taxConditions' | 'shippingConditions'
>;

// // Create an XRechnung
export type XRechnung = InvoiceCreate & {
  address: AddressExistingLexofficeContact;
  xRechnung: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  };
  lineItems: (CustomLineItemXRechnung | TextLineItem)[];
  taxConditions: {
    taxType: 'net';
    taxTypeNote?: string;
  };
};
// Response from creating any type of invoice
export type InvoiceCreateResponse = {
  id: string;
  resourceUri: string;
  createdDate: string;
  updatedDate: string;
  version: number;
};
// Response from retrieving an invoice by id
export type InvoiceRetrieveResponse = Partial<Invoice>;
// Responce from rendering DocumentFileId
export type DocumentFileId = Required<Partial<Invoice>, 'files'>;
////////////////////////////////////////
