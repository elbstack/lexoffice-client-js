import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import {
  InvoiceCreate,
  InvoiceCreateResponse,
  InvoiceRetrieveResponse,
  XRechnung,
  DocumentFileId,
} from './invoice-dto.type';
import { OptionalParameter } from './invoice.type';
import uri from 'uri-tag';

export class InvoiceClient extends BaseClient {
  async createInvoice(
    invoice: InvoiceCreate | XRechnung,
    optionalParameter?: OptionalParameter,
  ): Promise<Result<InvoiceCreateResponse, RequestError>> {
    return this.axios
      .post<InvoiceCreateResponse>('/invoices', invoice, { params: optionalParameter })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveInvoice(id: string): Promise<Result<InvoiceRetrieveResponse, RequestError>> {
    return this.axios
      .get<InvoiceRetrieveResponse>(uri`/invoices/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async renderInvoiceDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>> {
    return this.axios
      .get<DocumentFileId>(uri`/invoices/${id}/document`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
