import { Required } from 'utility-types';

export type Invoice = {
  id: string;
  organizationId: string;
  createdDate: string;
  updatedDate: string;
  version: number;
  language: string;
  archived: boolean;
  voucherStatus: 'draft' | 'open' | 'paid' | 'voided';
  voucherNumber: string;
  voucherDate: string;
  dueDate: string | null;
  // 1
  address: Address | AddressExistingLexofficeContact | AddressNonExistingLexofficeContact;
  xRechnung?: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  } | null;
  //   2
  lineItems: (LineItem | CustomLineItemXRechnung | CustomLineItem | TextLineItem)[];
  //   3
  totalPrice: TotalPrice | TotalPriceInvoiceCreate;
  // 4
  taxAmounts: TaxAmount[];
  //   5
  taxConditions: {
    taxType: TaxType;
    taxTypeNote?: string;
  };
  //   6
  paymentConditions?: PaymentConditions;
  //   7
  shippingConditions: ShippingConditions | ShippingConditionsNone | ShippingConditionsPeriod;
  closingInvoice: boolean;
  claimedGrossAmount: number;
  downPaymentDeductions: unknown[];
  recurringTemplateId: string | null;
  title?: string;
  introduction?: string;
  remark?: string;
  files: { documentFileId: string };
};

export type InvoiceForCreate = {
  language?: string;
  archived?: boolean;
  voucherDate: string;

  address: Address | AddressExistingLexofficeContact | AddressNonExistingLexofficeContact;
  xRechnung?: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  } | null;
  lineItems: (CustomLineItem | TextLineItem)[];
  totalPrice: TotalPrice | TotalPriceInvoiceCreate;
  taxAmounts?: TaxAmount[];
  taxConditions: {
    taxType: TaxType;
    taxTypeNote?: string;
  };
  paymentConditions?: PaymentConditions;
  shippingConditions: ShippingConditions | ShippingConditionsNone | ShippingConditionsPeriod;
  recurringTemplateId?: string | null;
  title?: string;
  introduction?: string;
  remark?: string;
};
// 1
export type Address = {
  contactId: string;
  name: string;
  supplement?: string;
  street: string;
  city: string;
  zip: string;
  countryCode: string;
  contactPerson: string;
};
export type AddressExistingLexofficeContact = Required<Partial<Address>, 'contactId'>;
export type AddressNonExistingLexofficeContact = Required<Partial<Address>, 'name' | 'countryCode'>;

// 2
export type LineItem = {
  id?: string;
  type: string;
  name: string;
  description?: string;
  quantity: number;
  unitName: string;
  unitPrice: UnitPrice | UnitPriceGross;
  discountPercentage?: number;
  lineItemAmount: number;

};

export type CustomLineItem = Omit<LineItem, 'lineItemAmount' | 'id'>;
export type CustomLineItemXRechnung = CustomLineItem;
export type TextLineItem = {
  type: string;
  name: string;
  description: string;

};

export type UnitPrice = {
  currency: string;
  netAmount: number;
  taxRatePercentage: TaxRatePercentage;
};

export type UnitPriceGross = Required<Partial<UnitPrice>, 'currency' | 'taxRatePercentage'> & {
  grossAmount: number;
};

// 3
export type TotalPrice = {
  currency: string;
  totalNetAmount: number;
  totalGrossAmount: number;
  totalTaxAmount: number;
  totalDiscountAbsolute?: number;
  totalDiscountPercentage?: number;
};
export type TotalPriceInvoiceCreate = Required<Partial<TotalPrice>, 'currency'>;
// 4
export type TaxAmount = {
  taxRatePercentage: TaxRatePercentage;
  taxAmount: number;
  netAmount: number;
};
// 5
export type TaxType = string;
// 6
export type PaymentConditions = {
  paymentTermLabel: string;
  paymentTermLabelTemplate?: string;
  paymentTermDuration: number;
  paymentDiscountConditions?: {
    discountPercentage: number;
    discountRange: number;
  };
};
// 7
export type ShippingConditions = {
  shippingDate: string;
  shippingType: string;
};
export type ShippingConditionsPeriod = ShippingConditions & {
  shippingType: string;
  shippingEndDate: string;
};
export type ShippingConditionsNone = Required<Partial<ShippingConditions>, 'shippingType'>;

// multiple usage
export type TaxRatePercentage = number;

export type OptionalFinalized = {
  finalized?: boolean;
};
