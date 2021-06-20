export type Payment = {
  openAmount: number;
  currency: string;
  paymentStatus: 'balanced' | 'openRevenue' | 'openExpense';
  voucherType: 'alesinvoice' | 'salescreditnote' | 'purchaseinvoice' | 'purchasecreditnote' | 'invoice' | 'downpaymentinvoice' | 'creditnote';
  voucherStatus: 'open' | 'paid' | 'paidoff' | 'voided' | 'transferred' | 'sepadebit';
};
