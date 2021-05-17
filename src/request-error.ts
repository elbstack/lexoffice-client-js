import { AxiosError } from 'axios';
import { Required } from 'utility-types';

type LexofficeErrorRegular = {
  timestamp: string;
  status: number;
  error: string;
  path: string;
  traceId: string;
  message: string;
  details?: ErrorDetails;
};

type ErrorDetails = {
  violation: string;
  field: string;
  message: string;
}[];

type LexofficeErrorLegacy = {
  i18nKey: string;
  source?: string | null;
  type: string;
  additionalData?: string | null;
  args?: string | null;
}[];

type LexofficeError = Required<AxiosError<LexofficeErrorRegular>, 'response'>;

type LexofficeLegacyError = Required<AxiosError<LexofficeErrorLegacy>, 'response'>;

function isAxiosError(error: Error | AxiosError): error is AxiosError {
  return typeof (error as any).isAxiosError !== 'undefined' && (error as any).isAxiosError;
}

function isLexofficeError(error: AxiosError): error is LexofficeError {
  return (
    error.response &&
    error.response.data.timestamp &&
    error.response.data.status &&
    error.response.data.error &&
    error.response.data.path &&
    error.response.data.traceId &&
    error.response.data.message
  );
}

export function handleRequestError(error: Error | AxiosError): RequestError {
  if (isAxiosError(error) && isLexofficeError(error)) {
    const timestamp = new Date(error.response.data.timestamp);
    const status = error.response.data.status;
    const errorDescription = error.response.data.error;
    const path = error.response.data.path;
    const traceId = error.response.data.traceId;
    const message = error.response.data.message;
    const errorDetails = error.response.data.details;
    switch (status) {
      case 400:
        return new RequestBadRequestError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 401:
        return new RequestUnauthorizedError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 402:
        return new PaymentRequiredError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 403:
        return new RequestForbiddenError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 404:
        return new RequestNotFoundError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 405:
        return new RequestMethodNotAllowedError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 406:
        return new RequestMethodNotAcceptableError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 409:
        return new ConflictError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 415:
        return new UnsupportedMediaTypeError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 429:
        return new TooManyRequestsError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 500:
        return new InternalServerError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 503:
        return new ServiceUnavailableError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 504:
        return new GatewayTimeoutError(
          message,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      default:
        return new RequestError(message, status);
    }
  }
  // return new RequestError(`${error.message}`);
  return new RequestError('Unknown request error');
}

export class RequestError extends Error {
  public readonly httpStatus?: number;
  public readonly errorDescription?: string;
  public readonly traceId?: string;
  public readonly requestedPath?: string;
  public readonly requestTimestamp?: Date;
  public readonly errorDetails?: ErrorDetails;

  constructor(
    message?: string,
    status?: number,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super('[Lexoffice Client Error] ' + message);
    this.httpStatus = status;
    this.errorDescription = errorDescription;
    this.traceId = traceId;
    this.requestTimestamp = timestamp;
    this.requestedPath = path;
    this.errorDetails = errorDetails;
  }
}

abstract class RequestLexofficeError extends RequestError {
  public readonly httpStatus!: number;
  public readonly requestTimestamp!: Date;
}

export class RequestBadRequestError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 400, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestUnauthorizedError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 401, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class PaymentRequiredError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 402, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestForbiddenError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 403, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestNotFoundError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, status, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestMethodNotAllowedError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 405, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestMethodNotAcceptableError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 406, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
export class ConflictError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 409, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
export class UnsupportedMediaTypeError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 415, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class TooManyRequestsError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 429, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class InternalServerError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 500, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
export class ServiceUnavailableError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 503, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
export class GatewayTimeoutError extends RequestLexofficeError {
  constructor(
    message: string,
    status: number,
    errorDescription: string,
    traceId: string,
    timestamp: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, 504, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
