export type PaymentCondition = {
  id: string;
  paymentTermLabelTemplate?: string;
  paymentTermDuration?: number;
  paymentDiscountConditions?: {
    discountRange?: number;
    discountPercentage?: number;
  };
  organizationDefault: boolean;
};
