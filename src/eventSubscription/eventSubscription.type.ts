export type EventSubscription = {
  subscriptionId: string;
  organizationId: string;
  createdDate: string;
  eventType: string;
  callbackUrl: string;
};

export type EventSubscriptionCreate = {
  eventType: string;
  callbackUrl: string;
};

export type EventSubscriptions = { content: EventSubscription[] };

export type WebhookCallback = {
  organizationId: string;
  eventType: string;
  resourceId: string;
  eventDate: string;
};
