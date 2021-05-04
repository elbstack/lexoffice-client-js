import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { PaymentCondition } from './paymentCondition.type';
import uri from 'uri-tag';

export class PaymentConditionClient extends BaseClient {
  async retrievePaymentConditionList(id: string): Promise<Result<PaymentCondition, RequestError>> {
    return this.axios
      .get<PaymentCondition>(uri`/payment-condition/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
