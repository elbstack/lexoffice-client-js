import { AxiosError } from 'axios';
import { Required } from 'utility-types';

type LexofficeErrorRegular = {
  timestamp?: string;
  status?: number;
  error?: string;
  path?: string;
  traceId?: string;
  message: string;
  details?: ErrorDetails;
};

type ErrorDetails = {
  violation: string;
  field: string;
  message: string;
}[];

type LexofficeErrorLegacy = {
  IssueList: IssueList;
};

type IssueList =
  | {
      i18nKey?: string;
      source?: string;
      type?: string;
      additionalData?: string;
      args?: string;
    }[]
  | undefined;

type LexofficeLegacyError = Required<AxiosError<LexofficeErrorLegacy>, 'response'>;

function isAxiosError(error: Error | AxiosError): error is AxiosError<LexofficeErrorRegular> {
  return typeof (error as any).isAxiosError !== 'undefined' && (error as any).isAxiosError;
}

function isLexofficeLegacyError(error: AxiosError): error is LexofficeLegacyError {
  return error.response && error.response.data.IssueList;
}

export function handleRequestError(error: Error | AxiosError): RequestError {
  if (isAxiosError(error) && isLexofficeLegacyError(error)) {
    const statusText = error.response.statusText;
    const status = error.response.status;
    const issueList = error.response.data.IssueList;
    switch (status) {
      case 400:
        return new RequestBadRequestLegacyError(statusText, issueList);
      case 406:
        return new RequestMethodNotAcceptableLegacyError(statusText, issueList);
      case 500:
        return new RequestInternalServerLegacyError(statusText, issueList);
      default:
        return new RequestLexofficeLegacyError(statusText, status, issueList);
    }
  } else if (isAxiosError(error) && error.response) {
    const status = error.response.status;
    const timestamp = error.response.data.timestamp
      ? new Date(error.response.data.timestamp)
      : undefined;
    const errorDescription = error.response.data.error;
    const path = error.response.data.path;
    const traceId = error.response.data.traceId;
    const messageOrig = error.response.data.message;
    const message =
      messageOrig ??
      'No further error informations provided by the API for this status code on this specific endpoint.';
    const errorDetails = error.response.data.details;

    switch (status) {
      case 400:
        return new RequestBadRequestError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 401:
        return new RequestUnauthorizedError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 402:
        return new RequestPaymentRequiredError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 403:
        return new RequestForbiddenError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 404:
        return new RequestNotFoundError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 405:
        return new RequestMethodNotAllowedError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 406:
        return new RequestMethodNotAcceptableError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 409:
        return new RequestConflictError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 415:
        return new RequestUnsupportedMediaTypeError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 429:
        return new RequestTooManyRequestsError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 500:
        return new RequestInternalServerError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 503:
        return new RequestServiceUnavailableError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      case 504:
        return new RequestGatewayTimeoutError(
          message,
          messageOrig,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
      default:
        return new RequestError(
          message,
          messageOrig,
          status,
          errorDescription,
          traceId,
          timestamp,
          path,
          errorDetails,
        );
    }
  }

  return new RequestError('Unknown Request Error');
}

export class RequestError extends Error {
  public readonly status?: number;
  public readonly error?: string;
  public readonly traceId?: string;
  public readonly path?: string;
  public readonly timestamp?: Date;
  public readonly details?: ErrorDetails;
  public readonly issueList?: IssueList;
  public readonly messageOrig?: string;

  constructor(
    message?: string,
    messageOrig?: string,
    status?: number,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super('[Lexoffice Client Error] ' + message);
    this.messageOrig = messageOrig;
    this.status = status;
    this.error = errorDescription;
    this.traceId = traceId;
    this.timestamp = timestamp;
    this.path = path;
    this.details = errorDetails;
  }
}

abstract class RequestLexofficeError extends RequestError {
  public readonly message!: string;
  public declare readonly issueList: undefined;
}

class RequestLexofficeLegacyError extends RequestError {
  public declare readonly issueList: IssueList;
  constructor(statusText: string, status: number, issueList: IssueList) {
    super('Legacy: ' + statusText, undefined, status);
    this.issueList = issueList;
  }
}

// Regular Errors
export class RequestBadRequestError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 400, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestUnauthorizedError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 401, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestPaymentRequiredError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 402, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestForbiddenError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 403, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestNotFoundError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 404, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestMethodNotAllowedError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 405, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestMethodNotAcceptableError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 406, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestConflictError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 409, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
export class RequestUnsupportedMediaTypeError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 415, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestTooManyRequestsError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 429, errorDescription, traceId, timestamp, path, errorDetails);
  }
}

export class RequestInternalServerError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 500, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
export class RequestServiceUnavailableError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 503, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
export class RequestGatewayTimeoutError extends RequestLexofficeError {
  constructor(
    message: string,
    messageOrig?: string,
    errorDescription?: string,
    traceId?: string,
    timestamp?: Date,
    path?: string,
    errorDetails?: ErrorDetails,
  ) {
    super(message, messageOrig, 504, errorDescription, traceId, timestamp, path, errorDetails);
  }
}
// Legacy errors
export class RequestBadRequestLegacyError extends RequestLexofficeLegacyError {
  constructor(statusText: string, issueList?: IssueList) {
    super(statusText, 400, issueList);
  }
}
export class RequestMethodNotAcceptableLegacyError extends RequestLexofficeLegacyError {
  constructor(statusText: string, issueList?: IssueList) {
    super(statusText, 406, issueList);
  }
}
export class RequestInternalServerLegacyError extends RequestLexofficeLegacyError {
  constructor(statusText: string, issueList?: IssueList) {
    super(statusText, 500, issueList);
  }
}
