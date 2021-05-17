import { Required } from 'utility-types';
import { InvoiceCreateResponse } from '..';

export type Voucher = {
  id: string;
  organizationId: string;
  type: string;
  voucherStatus: string;
  voucherNumber: string;
  voucherDate: string;
  shippingDate: string;
  dueDate: string;
  totalGrossAmount: number;
  totalTaxAmount: number;
  taxType: string;
  useCollectiveContact: boolean;
  contactId?: string;
  remark?: string;
  voucherItems: {
    amount: number;
    taxAmount: number;
    taxRatePercent: number;
    categoryId: string;
  }[];
  files: string[] | [];
  createdDate: string;
  updatedDate: string;
  version: number;
};

export type CreateVoucher = Required<
  Partial<Voucher>,
  | 'type'
  | 'voucherNumber'
  | 'voucherDate'
  | 'totalGrossAmount'
  | 'totalTaxAmount'
  | 'taxType'
  | 'voucherItems'
  | 'version'
>;

export type VoucherCreateResponse = InvoiceCreateResponse;

export type Vouchers = {
  content: Voucher[];
};

export type VoucherNumber = {
  voucherNumber: string;
};
