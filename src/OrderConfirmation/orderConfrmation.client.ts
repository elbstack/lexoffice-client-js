import { Err, Ok, Result } from 'ts-results';
import { DocumentFileId } from '..';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import {
  OrderConfirmation,
  OrderConfirmationResponse,
  OrderConfirmationRetrieveResponse,
} from './orderConfirmation.type';
import uri from 'uri-tag';

export class OrderConfirmationClient extends BaseClient {
  async createOrderConfirmation(
    orderConfirmation: OrderConfirmation,
  ): Promise<Result<OrderConfirmationResponse, RequestError>> {
    return this.axios
      .post<OrderConfirmationResponse>('/order-confirmations', orderConfirmation)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveOrderConfirmation(
    id: string,
  ): Promise<Result<OrderConfirmationRetrieveResponse, RequestError>> {
    return this.axios
      .get<OrderConfirmationRetrieveResponse>(uri`/order-confirmations/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async renderInvoiceDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>> {
    return this.axios
      .get<DocumentFileId>(uri`/order-confirmations/${id}/document`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
