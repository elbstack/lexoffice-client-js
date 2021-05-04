import { BaseClient } from '../base.client';
import { Country } from './country.type';
import { Err, Ok, Result } from 'ts-results';
import { handleRequestError, RequestError } from '../request-error';

export class CountryClient extends BaseClient {
  async retrieveListOfCountries(): Promise<Result<Country[], RequestError>> {
    return this.axios
      .get<Country[]>(`/countries`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
