import { Required } from 'utility-types';

export type Invoice = {
  id: string;
  organizationId: string;
  createdDate: string;
  updatedDate: string;
  version: number;
  language: 'de' | 'en';
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
  language: 'de' | 'en';
  archived?: boolean;
  voucherDate: string;

  address: Address | AddressExistingLexofficeContact | AddressNonExistingLexofficeContact;
  xRechnung?: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  } | null;
  lineItems: (CustomLineItem | TextLineItem)[];
  totalPrice: TotalPrice | TotalPriceInvoiceCreate;
  taxAmounts: TaxAmount[];
  taxConditions: {
    taxType: TaxType;
    taxTypeNote?: string;
  };
  paymentConditions?: PaymentConditions;
  shippingConditions: ShippingConditions | ShippingConditionsNone | ShippingConditionsPeriod;
  recurringTemplateId: string | null;
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
  id: string;
  type: 'service' | 'material' | 'custom' | 'text';
  name: string;
  description?: string;
  quantity: number;
  unitName: string;
  unitPrice: UnitPrice | UnitPriceGross;
  discountPercentage: number;
  lineItemAmount: number;
};

export type CustomLineItem = Partial<Omit<LineItem, 'lineItemAmount' | 'id'>> & {
  type: 'custom';
};
export type CustomLineItemXRechnung = CustomLineItem & {
  type: 'custom' | 'service' | 'material';
};
export type TextLineItem = Omit<
  LineItem,
  'id' | 'quantity' | 'unitName' | 'unitPrice' | 'discountPercentage' | 'lineItemAmount'
> & {
  type: 'text';
};

export type UnitPrice = {
  currency: 'EUR';
  netAmount: number;
  taxRatePercentage: TaxRatePercentage;
};

export type UnitPriceGross = Required<Partial<UnitPrice>, 'currency' | 'taxRatePercentage'> & {
  grossAmount: number;
};

// 3
export type TotalPrice = {
  currency: 'EUR';
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
export type TaxType =
  | 'gross'
  | 'net'
  | 'vatfree'
  | 'intraCommunitySupply'
  | 'constructionService13b'
  | 'externalService13b'
  | 'thirdPartyCountryService'
  | 'thirdPartyCountryDelivery';
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
  shippingType: 'service' | 'delivery' | 'serviceperiod' | 'deliveryperiod' | 'none';
};
export type ShippingConditionsPeriod = ShippingConditions & {
  shippingType: 'serviceperiod' | 'deliveryperiod';
  shippingEndDate: string;
};
export type ShippingConditionsNone = Required<Partial<ShippingConditions>, 'shippingType'> & {
  shippingType: 'none';
};
// multiple usage
export type TaxRatePercentage = 0 | 5 | 7 | 16 | 19;

export type OptionalParameter = {
  finalized?: boolean;
};
