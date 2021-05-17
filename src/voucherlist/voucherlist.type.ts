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
  voucherType: string;
  voucherStatus: string;
  archived?: boolean;
  size?: number;
  sort?: string;
};
