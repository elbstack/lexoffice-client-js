import { AxiosError } from 'axios';
import { Required } from 'utility-types';

function isAxiosError(error: Error | AxiosError): error is AxiosError {
  return typeof (error as any).isAxiosError !== 'undefined' && (error as any).isAxiosError;
}

export function handleRequestError(error: Error | AxiosError): RequestError {
  // if (isAxiosError(error) && isLexofficeError(error)) {
  //   const status = error.response.data.status;
  //   const message = error.response.data.message;
  //   const errorCode = error.response.data.errorCode;
  //   const path = error.response.data.path;
  //   const timestamp = new Date(error.response.data.timestamp);
  //   switch (status) {
  //     case 400:
  //       return new RequestBadRequestError(message, errorCode, timestamp, path);
  //     case 401:
  //       return new RequestUnauthorizedError(message, errorCode, timestamp, path);
  //     case 403:
  //       return new RequestForbiddenError(message, errorCode, timestamp, path);
  //     case 404:
  //       return new RequestNotFoundError(message, errorCode, timestamp, path);
  //     case 405:
  //       return new RequestMethodNotAllowedError(message, errorCode, timestamp, path);
  //     default:
  //       return new RequestError(message, status, errorCode, timestamp, path);
  //   }
  // }
  return new RequestError(`${error.message}`);
}

export class RequestError extends Error {
  public readonly httpStatus?: number;
  public readonly errorCode?: number;
  public readonly requestedPath?: string;
  public readonly requestTimestamp?: Date;

  constructor(
    message?: string,
    status?: number,
    errorCode?: number,
    timestamp?: Date,
    path?: string,
  ) {
    super('[Lexoffice Client Error] ' + message);
    this.httpStatus = status;
    this.errorCode = errorCode;
    this.requestTimestamp = timestamp;
    this.requestedPath = path;
  }
}

abstract class RequestLexofficeError extends RequestError {
  public readonly httpStatus!: number;
  public readonly errorCode!: number;
  public readonly requestTimestamp!: Date;
}

export class RequestBadRequestError extends RequestLexofficeError {
  constructor(message: string, errorCode: number, timestamp: Date, path?: string) {
    super(message, 400, errorCode, timestamp, path);
  }
}

export class RequestUnauthorizedError extends RequestLexofficeError {
  constructor(message: string, errorCode: number, timestamp: Date, path?: string) {
    super(message, 401, errorCode, timestamp, path);
  }
}

export class RequestForbiddenError extends RequestLexofficeError {
  constructor(message: string, errorCode: number, timestamp: Date, path?: string) {
    super(message, 403, errorCode, timestamp, path);
  }
}

export class RequestNotFoundError extends RequestLexofficeError {
  constructor(message: string, errorCode: number, timestamp: Date, path?: string) {
    super(message, 404, errorCode, timestamp, path);
  }
}

export class RequestMethodNotAllowedError extends RequestLexofficeError {
  constructor(message: string, errorCode: number, timestamp: Date, path?: string) {
    super(message, 405, errorCode, timestamp, path);
  }
}
