import { Err, Ok, Result } from 'ts-results';
import { FileResponse } from '..';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import {
  CreateVoucher,
  VoucherNumber,
  Voucher,
  VoucherCreateResponse,
  Vouchers,
} from './voucher.type';
import FormData from 'form-data';
import uri from 'uri-tag';

export class VoucherClient extends BaseClient {
  async createVoucher(
    voucher: CreateVoucher,
  ): Promise<Result<VoucherCreateResponse, RequestError>> {
    return this.axios
      .post<VoucherCreateResponse>('/vouchers', voucher)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveVoucher(id: string): Promise<Result<Partial<Voucher>, RequestError>> {
    return this.axios
      .get<Partial<Voucher>>(uri`/vouchers/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async updateVoucher(
    id: string,
    voucher: CreateVoucher,
  ): Promise<Result<VoucherCreateResponse, RequestError>> {
    return this.axios
      .put<VoucherCreateResponse>(uri`/vouchers/${id}`, voucher)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async filterVoucher(
    voucherNumber: VoucherNumber,
  ): Promise<Result<Partial<Vouchers>, RequestError>> {
    return this.axios
      .get<Partial<Vouchers>>(`/vouchers`, { params: voucherNumber })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async uploadFileToVoucher(
    data: FormData,
    id: string,
  ): Promise<Result<FileResponse, RequestError>> {
    return this.axios
      .post<FileResponse>(uri`/vouchers/${id}/files`, data, {
        headers: {
          ...data.getHeaders(),
        },
      })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
