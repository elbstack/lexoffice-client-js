import { Invoice } from '../invoice/invoice.type';

export type DownPaymentInvoice = Partial<
  Omit<
    Invoice,
    'XRechnung' | 'claimedGrossAmount' | 'downPaymentDeductions' | 'recurringTemplateId'
  >
>;
