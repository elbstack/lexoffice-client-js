export type Profile = {
  organizationId: string;
  companyName: string;
  created: {
    userId: string;
    userName: string;
    userEmail: string;
    date: string;
  };
  connectionId: string;
  features: string[];
  subscriptionStatus: string;
  taxType: string;
  smallBusiness: string;
};
