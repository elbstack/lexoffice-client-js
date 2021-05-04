import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { DownPaymentInvoice } from './downPaymentInvoice.type';
import uri from 'uri-tag';

export class DownPaymentInvoiceClient extends BaseClient {
  async retrieveDownPaymentInvoice(id: string): Promise<Result<DownPaymentInvoice, RequestError>> {
    return this.axios
      .get<DownPaymentInvoice>(uri`/down-payment-invoices/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
