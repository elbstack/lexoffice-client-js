import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { Profile } from './profile.type';

export class ProfileClient extends BaseClient {
  async retrieveProfile(): Promise<Result<Profile, RequestError>> {
    return this.axios
      .get<Profile>(`/profile`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
