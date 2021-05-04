import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { Payment } from './payment.type';
import uri from 'uri-tag';

export class PaymentClient extends BaseClient {
  async retrievePayment(id: string): Promise<Result<Payment, RequestError>> {
    return this.axios
      .get<Payment>(uri`/payments/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
