import { Required } from 'utility-types';

import {
  Address,
  AddressExistingLexofficeContact,
  AddressNonExistingLexofficeContact,
  CustomLineItem,
  InvoiceCreateResponse,
  LineItem,
  PaymentConditions,
  ShippingConditions,
  ShippingConditionsNone,
  ShippingConditionsPeriod,
  TaxAmount,
  TaxType,
  TextLineItem,
  TotalPrice,
  TotalPriceInvoiceCreate,
} from '..';

export type Quotation = {
  id: string;
  organizationId: string;
  createdDate: string;
  updatedDate: string;
  expirationDate: string;
  version: number;
  language: string;
  archived: boolean;
  voucherStatus: 'draft' | 'open' | 'accepted' | 'rejected';
  voucherNumber: string;
  voucherDate: string;
  address: Address | AddressExistingLexofficeContact | AddressNonExistingLexofficeContact;
  lineItems: ((LineItem & Optionals) | (CustomLineItem & Optionals) | (TextLineItem & Optionals))[];
  totalPrice: TotalPrice | TotalPriceInvoiceCreate;
  taxAmounts: TaxAmount[];
  taxConditions: {
    taxType: TaxType;
    taxTypeNote?: string;
  };
  paymentConditions?: PaymentConditions;
  shippingConditions: ShippingConditions | ShippingConditionsNone | ShippingConditionsPeriod;
  closingInvoice: boolean;
  title?: string;
  introduction?: string;
  remark?: string;
  files: { documentFileId: string };
};

export type Optionals = {
  optional?: boolean;
  alternative?: boolean;
  subItems?: (
    | (LineItem & {
        optional?: boolean;
        alternative?: boolean;
      })
    | (CustomLineItem & {
        optional?: boolean;
        alternative?: boolean;
      })
    | (TextLineItem & {
        optional?: boolean;
        alternative?: boolean;
      })
  )[];
};

export type QuotationCreate = Required<
  Partial<Quotation>,
  'voucherDate' | 'expirationDate' | 'address' | 'lineItems' | 'totalPrice' | 'taxConditions'
>;
export type QuotationCreateResponse = InvoiceCreateResponse;
