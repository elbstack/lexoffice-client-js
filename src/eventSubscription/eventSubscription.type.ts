export type EventSubscription = {
  subscriptionId: string;
  organizationId: string;
  createdDate: string;
  eventType: EventType;
  callbackUrl: string;
};

export type EventSubscriptionCreate = {
  eventType: EventType;
  callbackUrl: string;
};

export type EventSubscriptions = { content: EventSubscription[] };
export type EventType =
  | 'contact.created'
  | 'contact.changed'
  | 'contact.deleted'
  | 'credit-note.created'
  | 'credit-note.changed'
  | 'credit-note.deleted'
  | 'credit-note.status.changed'
  | 'invoice.created'
  | 'invoice.changed'
  | 'invoice.deleted'
  | 'invoice.status.changed'
  | 'down-payment-invoice.created'
  | 'down-payment-invoice.changed'
  | 'down-payment-invoice.deleted'
  | 'down-payment-invoice.status.changed'
  | 'order-confirmation.created'
  | 'order-confirmation.changed'
  | 'order-confirmation.deleted'
  | 'order-confirmation.status.changed'
  | 'quotation.created'
  | 'quotation.changed'
  | 'quotation.deleted'
  | 'quotation.status.changed'
  | 'token.revoked'
  | 'voucher.created'
  | 'voucher.changed'
  | 'voucher.deleted'
  | 'voucher.status.changed'
  | 'payment.changed'
  | 'recurring-template.created'
  | 'recurring-template.changed'
  | 'recurring-template.deleted';

export type WebhookCallback = {
  organizationId: string;
  eventType: EventType;
  resourceId: string;
  eventDate: string;
};
