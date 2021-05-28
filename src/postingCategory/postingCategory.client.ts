import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { PostingCategory } from './postingCategory.type';

export class PostingCategoryClient extends BaseClient {
  async retrieveListPostingCategories(): Promise<Result<PostingCategory[], RequestError>> {
    return this.axios
      .get<PostingCategory[]>(`/posting-categories`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
