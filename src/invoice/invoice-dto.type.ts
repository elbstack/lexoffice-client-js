import { Required } from 'utility-types';
import {
  Invoice,
  InvoiceForCreate,
  AddressExistingLexofficeContact,
  CustomLineItemXRechnung,
  TextLineItem,
} from './invoice.type';

//  Create an Invoice
export type InvoiceCreate = InvoiceForCreate;
// // Create an XRechnung
export type XRechnung = InvoiceCreate & {
  address: AddressExistingLexofficeContact;
  xRechnung: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  };
  lineItems: (CustomLineItemXRechnung | TextLineItem)[];
  taxConditions: {
    taxType: string;
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
// export type DocumentFileId = {documentFileId:string;}
////////////////////////////////////////
