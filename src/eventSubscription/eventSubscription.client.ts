import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import {
  EventSubscription,
  EventSubscriptionCreate,
  EventSubscriptions,
} from './eventSubscription.type';
import uri from 'uri-tag';

export class EventSubscriptionClient extends BaseClient {
  async createEventSubscription(
    eventSubscription: EventSubscriptionCreate,
  ): Promise<Result<EventSubscription, RequestError>> {
    return this.axios
      .post<EventSubscription>('/event-subscriptions', eventSubscription)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveEventSubscription(id: string): Promise<Result<EventSubscription, RequestError>> {
    return this.axios
      .get<EventSubscription>(uri`/event-subscriptions/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveAllEventSubscriptions(): Promise<Result<EventSubscriptions, RequestError>> {
    return this.axios
      .get<EventSubscriptions>(`/event-subscriptions`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async deleteEventSubscription(id: string): Promise<Result<unknown, RequestError>> {
    return this.axios
      .delete<unknown>(uri`/event-subscriptions/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
