export type Voucherlist = {
  content: {
    id: string;
    voucherType: 'salesinvoice' | 'salescreditnote' | 'purchaseinvoice' | 'purchasecreditnote' | 'invoice' | 'downpaymentinvoice' | 'creditnote' | 'orderconfirmation' | 'quotation';
    voucherStatus: 'draft' | 'open' | 'paid' | 'paidoff' | 'voided' | 'transferred' | 'sepadebit' | 'overdue' | 'accepted' | 'rejected';
    voucherNumber: string;
    voucherDate: string;
    updatedDate: string;
    dueDate: string;
    contactName: string;
    totalAmount: number;
    openAmount: number;
    currency: string;
    archived: boolean;
  }[];
};

export type FilterParameter = {
  voucherType: string;
  voucherStatus: string;
  archived?: boolean;
  size?: number;
  sort?: string;
};
