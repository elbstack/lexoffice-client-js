import { InvoiceClient } from './invoice/invoice.client';
import { ContactsClient } from './contact/contact.client';
import { BaseClient } from './base.client';
import { applyMixins } from './utils';
import { CountryClient } from './country/country.client';
import { CreditNoteClient } from './creditNote/creditNote.client';
import { DownPaymentInvoiceClient } from './downPaymentInvoice/downPaymentInvoice.client';
import { EventSubscriptionClient } from './eventSubscription/eventSubscription.client';
import { OrderConfirmationClient } from './orderConfirmation/orderConfrmation.client';
import { PaymentClient } from './payment/payment.client';
import { PaymentConditionClient } from './paymentCondition/paymentCondition.client';
import { ProfileClient } from './profile/profile.client';
import { QuotationClient } from './quotation/quotation.client';
import { RecurringTemplateClient } from './recurringTemplate/recurringTemplate.client';
import { VoucherlistClient } from './voucherList/voucherList.client';
import { VoucherClient } from './voucher/voucher.client';
import { FileClient } from './file/file.client';
import { PostingCategoryClient } from './postingCategory/postingCategory.client';

class Client extends BaseClient {}
interface Client
  extends InvoiceClient,
    ContactsClient,
    CountryClient,
    CreditNoteClient,
    DownPaymentInvoiceClient,
    EventSubscriptionClient,
    OrderConfirmationClient,
    PaymentClient,
    PaymentConditionClient,
    ProfileClient,
    QuotationClient,
    RecurringTemplateClient,
    VoucherlistClient,
    VoucherClient,
    FileClient,
    PostingCategoryClient {}
applyMixins(Client, [
  InvoiceClient,
  ContactsClient,
  CountryClient,
  CreditNoteClient,
  DownPaymentInvoiceClient,
  EventSubscriptionClient,
  OrderConfirmationClient,
  PaymentClient,
  PaymentConditionClient,
  ProfileClient,
  QuotationClient,
  RecurringTemplateClient,
  VoucherlistClient,
  VoucherClient,
  FileClient,
  PostingCategoryClient,
]);

export { Client };
export * from './request-error';
export * from './invoice/invoice-dto.type';
export * from './invoice/invoice.type';
export * from './contact/contact.type';
export * from './country/country.type';
export * from './creditNote/creditNote.type';
export * from './downPaymentInvoice/downPaymentInvoice.type';
export * from './eventSubscription/eventSubscription.type';
export * from './orderConfirmation/orderConfirmation.type';
export * from './payment/payment.type';
export * from './paymentCondition/paymentCondition.type';
export * from './profile/profile.type';
export * from './quotation/quotation.type';
export * from './recurringTemplate/recurringTemplate.type';
export * from './voucherList/voucherList.type';
export * from './voucher/voucher.type';
export * from './file/file.type';
export * from './postingCategory/postingCategory.type';
