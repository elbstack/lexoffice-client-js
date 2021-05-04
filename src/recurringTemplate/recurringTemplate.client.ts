import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { RecurringTemplate, RecurringTemplates } from './recurringTemplate.type';
import { Parameters } from './recurringTemplate.type';
import uri from 'uri-tag';

export class RecurringTemplateClient extends BaseClient {
  async retrieveRecurringTemplate(
    id: string,
  ): Promise<Result<Partial<RecurringTemplate>, RequestError>> {
    return this.axios
      .get<Partial<RecurringTemplate>>(uri`/recurring-templates/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveAllRecurringTemplates(
    optionalParameter?: Parameters,
  ): Promise<Result<RecurringTemplates, RequestError>> {
    return this.axios
      .get<RecurringTemplates>(uri`/recurring-templates`, { params: optionalParameter })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
