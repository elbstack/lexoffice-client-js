import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { FilterParameter, Voucherlist } from './voucherList.type';
import uri from 'uri-tag';

export class VoucherlistClient extends BaseClient {
  async retrieveVoucherlist(
    filterParameter: FilterParameter,
  ): Promise<Result<Voucherlist, RequestError>> {
    return this.axios
      .get<Voucherlist>(uri`/voucherlist`, { params: filterParameter })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
