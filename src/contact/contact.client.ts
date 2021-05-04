import { BaseClient } from '../base.client';
import {
  ContactCreatePerson,
  ContactCreateCompany,
  ContactUpdatePerson,
  ContactUpdateCompany,
  ContactCreateResponse,
  ContactRetrieveResponse,
  ContactUpdateResponse,
  Parameters,
} from '../index';
import { Err, Ok, Result } from 'ts-results';
import { handleRequestError, RequestError } from '../request-error';
import { ContactFilterRetrieveResponse, OptionalFilters } from './contact.type';
import uri from 'uri-tag';

export class ContactsClient extends BaseClient {
  async createContact(
    contact: ContactCreatePerson | ContactCreateCompany,
  ): Promise<Result<ContactCreateResponse, RequestError>> {
    return this.axios
      .post<ContactCreateResponse>('/contacts', contact)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveContact(id: string): Promise<Result<ContactRetrieveResponse, RequestError>> {
    return this.axios
      .get<ContactRetrieveResponse>(uri`/contacts/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async updateContact(
    id: string,
    contact: ContactUpdatePerson | ContactUpdateCompany,
  ): Promise<Result<ContactUpdateResponse, RequestError>> {
    return this.axios
      .put<ContactUpdateResponse>(uri`/contacts/${id}`, contact)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async filterContact(
    filter?: OptionalFilters & Partial<Parameters>,
  ): Promise<Result<ContactFilterRetrieveResponse, RequestError>> {
    console.log('filter: ', filter);

    return this.axios
      .get<ContactFilterRetrieveResponse>(uri`/contacts`, { params: filter })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
