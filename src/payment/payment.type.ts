export type Payment = {
  openAmount: number;
  currency: 'EUR';
  paymentStatus: 'balanced' | 'openRevenue' | 'openExpense';
  voucherType: VoucherType;
  voucherStatus: VoucherStatus;
};

export type VoucherType =
  | 'salesinvoice'
  | 'salescreditnote'
  | 'purchaseinvoice'
  | 'purchasecreditnote'
  | 'invoice'
  | 'downpaymentinvoice'
  | 'creditnote';

export type VoucherStatus = 'oped' | 'paid' | 'paidoff' | 'voided' | 'transferred' | 'sepadebit';
