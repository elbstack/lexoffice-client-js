import { Invoice } from '..';
import { InvoiceCreate, InvoiceCreateResponse } from '../invoice/invoice-dto.type';
import { Required } from 'utility-types';

import {
  Address,
  AddressExistingLexofficeContact,
  AddressNonExistingLexofficeContact,
  CustomLineItem,
  LineItem,
  TaxAmount,
  TaxType,
  TextLineItem,
  TotalPrice,
  TotalPriceInvoiceCreate,
} from '../invoice/invoice.type';

export type CreditNote = Omit<
  Invoice,
  'dueDate' | 'XRechnung' | 'paymentConditions' | 'shippingConditions'
> & {
  voucherStatus: string;
  lineItem:
    | Omit<LineItem, 'discountPercentage'>
    | Omit<CustomLineItem, 'discountPercentage'>
    | TextLineItem;
};

export type CreditNoteForCreate = {
  language: string;
  archived: boolean;
  voucherDate: string;
  address: Address | AddressExistingLexofficeContact | AddressNonExistingLexofficeContact;
  lineItems: (
    | Omit<LineItem, 'discountPercentage'>
    | Omit<CustomLineItem, 'discountPercentage'>
    | TextLineItem
  )[];
  totalPrice: TotalPrice | TotalPriceInvoiceCreate;
  taxAmounts: TaxAmount[];
  taxConditions: {
    taxType: TaxType;
    taxTypeNote?: string;
  };
  title?: string;
  introduction?: string;
  remark?: string;
};

export type CreditNoteCreate = Required<
  Partial<CreditNoteForCreate>,
  'voucherDate' | 'address' | 'lineItems' | 'totalPrice' | 'taxConditions'
>;

export type CreditNoteCreateResponse = InvoiceCreateResponse;
export type CreditNoteRetrieveResponse = Partial<CreditNote>;
