import {
  InvoiceCreate,
  InvoiceCreateResponse,
  InvoiceRetrieveResponse,
} from '../invoice/invoice-dto.type';

export type OrderConfirmation = InvoiceCreate & {
  deliveryTerms?: string;
};

export type OrderConfirmationResponse = InvoiceCreateResponse;

export type OrderConfirmationRetrieveResponse = InvoiceRetrieveResponse & {
  deliveryTerms?: string;
};
