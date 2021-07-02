import { Err, Ok, Result } from 'ts-results';
import { BaseClient } from '../base.client';
import { handleRequestError, RequestError } from '../request-error';
import { FileResponse } from './file.type';
import { RenderType } from './file.type';
import FormData from 'form-data';
import uri from 'uri-tag';

export class FileClient extends BaseClient {
  async uploadFile(data: FormData): Promise<Result<FileResponse, RequestError>> {
    return this.axios
      .post<FileResponse>('/files', data, {
        headers: {
          ...data.getHeaders(),
        },
      })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async downloadFile(
    documentFileId: string,
    optionalParameter?: RenderType,
  ): Promise<Result<unknown, RequestError>> {
    return this.axios
      .get<unknown>(uri`/files/${documentFileId}`, {
        headers: {
          Accept: '*/*',
        },
        params: optionalParameter,
        responseType: 'arraybuffer',
      })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
