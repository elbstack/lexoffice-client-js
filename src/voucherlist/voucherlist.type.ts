export type Voucherlist = {
  content: {
    id: string;
    voucherType: string;
    voucherStatus: string;
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
  voucherType:
    | 'salesinvoice'
    | 'salescreditnote'
    | 'purchaseinvoice'
    | 'purchasecreditnote'
    | 'invoice'
    | 'creditnote'
    | 'orderconfirmation'
    | 'quotation'
    | 'downpaymentinvoice';
  voucherStatus:
    | 'draft'
    | 'open'
    | 'overdue'
    | 'paid'
    | 'paidoff'
    | 'voided'
    | 'transferred'
    | 'sepadebit'
    | 'accepted'
    | 'rejected';
  archived?: boolean;
  size?: number;
  sort?: string;
};
