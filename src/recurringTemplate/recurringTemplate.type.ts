import { Invoice } from '..';

export type RecurringTemplate = Omit<
  Invoice,
  | 'voucherStatus'
  | 'voucherNumber'
  | 'voucherDate'
  | 'dueDate'
  | 'shippingConditions'
  | 'files'
  | 'XRechnung'
> & {
  recurringTemplateSettings: {
    id: string;
    startDate?: string;
    endDate?: string;
    finalize: boolean;
    shippingType: 'service' | 'delivery' | 'serviceperiod' | 'deliveryperiod' | 'none';
    executionInterval: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'BIANNUALLY' | 'ANNUALLY';
    nextExecutionDate: string;
    lastExecutionFailed: boolean;
    lastExecutionErrorMessage?: string | null;
    executionStatus: 'ACTIVE' | 'PAUSED' | 'ENDED';
  };
};

export type Parameters = {
  size?: number;
  page?: number;
  sort?: string;
};

export type RecurringTemplates = {
  content: Partial<RecurringTemplate[]> & Partial<PagingOfRessources>;
};

export type PagingOfRessources = {
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
  sort?: [
    {
      property: string;
      direction: string;
      ignoreCase: boolean;
      nullHandling: string;
      ascending: boolean;
    },
  ];
};
