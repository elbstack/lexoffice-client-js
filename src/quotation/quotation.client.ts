import { Err, Ok, Result } from 'ts-results';
import { DocumentFileId, OptionalFinalized } from '..';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { Quotation, QuotationCreate } from './quotation.type';
import uri from 'uri-tag';

export class QuotationClient extends BaseClient {
  async createQuotation(
    quotation: QuotationCreate,
    optionalFilter?: OptionalFinalized,
  ): Promise<Result<QuotationCreate, RequestError>> {
    return this.axios
      .post<QuotationCreate>('/quotations', quotation, { params: optionalFilter })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveQuotation(id: string): Promise<Result<Partial<Quotation>, RequestError>> {
    return this.axios
      .get<Partial<Quotation>>(uri`/quotations/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
  async renderQuotationDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>> {
    return this.axios
      .get<DocumentFileId>(uri`/quotations/${id}/document`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
