import { Required } from 'utility-types';
import { InvoiceCreateResponse, PagingOfRessources } from '..';

export type ContactFull = {
  id: string;
  organizationId: string;
  version: number;
  roles: {
    customer?: {
      number: number;
    };
    vendor?: {
      number: number;
    };
  };
  // 1
  company?: Company;
  person?: {
    salutation?: string;
    firstName?: string;
    lastName: string;
  };
  // 2
  addresses: {
    billing?: AddressContact[];
    shipping?: AddressContact[];
  };
  xRechnung?: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  };
  // 3
  emailAddresses: EmailAddresses;
  // 4
  phoneNumbers: PhoneNumbers;
  note: string;
  archived: boolean;
};
// 1
export type Company = {
  name: string;
  taxNumber?: string;
  vatRegistrationId?: string;
  allowTaxFreeInvoices?: boolean;
  contactPersons?: {
    salutation?: string;
    firstName?: string;
    lastName: string;
    primary?: boolean;
    emailAddress?: string;
    phoneNumber?: string;
  }[];
};
// 2
export type AddressContact = {
  supplement?: string;
  street?: string;
  zip?: string;
  city?: string;
  countryCode: string;
};
// 3
export type EmailAddresses = {
  business?: string[];
  office?: string[];
  private?: string[];
  other?: string[];
};
// 4
export type PhoneNumbers = EmailAddresses & {
  mobile?: string[];
  fax?: string[];
};
///////////////////////////////////////////
export type ContactCreatePerson = {
  id?: string;
  organizationId?: string;
  version: number;
  roles:
    | {
        customer: {};
        vendor: {};
      }
    | { customer: {} }
    | { vendor: {} };
  person: {
    salutation?: string;
    firstName?: string;
    lastName: string;
  };
  addresses?: {
    billing?: AddressContact[];
    shipping?: AddressContact[];
  };
  xRechnung?: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  };
  emailAddresses?: EmailAddresses;
  phoneNumbers?: PhoneNumbers;
  note?: string;
};

export type ContactCreateCompany = {
  id?: string;
  organizationId?: string;
  version: number;
  roles:
    | {
        customer: {};
        vendor: {};
      }
    | { customer: {} }
    | { vendor: {} };
  company: Company;
  addresses?: {
    billing?: AddressContact[];
    shipping?: AddressContact[];
  };
  xRechnung?: {
    buyerReference: string;
    vendorNumberAtCustomer: string;
  };
  emailAddresses?: EmailAddresses;
  phoneNumbers?: PhoneNumbers;
  note?: string;
};
export type ContactUpdatePerson = ContactCreatePerson;

export type ContactUpdateCompany = ContactCreateCompany;

export type ContactCreateResponse = InvoiceCreateResponse;
export type ContactUpdateResponse = ContactCreateResponse;

export type ContactRetrieveResponse = Partial<ContactFull>;

export type OptionalFilters = {
  email?: string;
  name?: string;
  number?: number;
  customer?: boolean;
  vendor?: boolean;
};

export type ContactFilterRetrieveResponse = Partial<PagingOfRessources> & {
  content: Partial<ContactFull>[];
};
