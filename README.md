# lexoffice-client-js

Node.js/Typescript client library for the [lexoffice Public API](https://www.lexoffice.de/partner/public-api/).

## Installation

```bash
npm install @elbstack/lexoffice-client-js
```

## Documentation

You can find the lexoffice API documentation [here](https://developers.lexoffice.io/docs/#lexoffice-api-documentation).

## Usage

To get your API Key, you must already be a lexoffice user. Get it [here](https://app.lexoffice.de/settings/#/public-api).

```ts
import { Client } from '@elbstack/lexoffice-client-js';

const client = new Client({ YOUR_API_KEY });
```

## Examples

All functions should be 'async' as the clients methods return promises. These promises are formatted by the [ts-results package](https://github.com/vultix/ts-results). If you want to use the advantages of ts-results, all client responses should be processed similar to the following:

```ts
if (YOUR_RESULT.ok) {
  const YOUR_VARIABLE = YOUR_RESULT.val;
  // Work with your result
} else {
  // Your request returned an error
  const error = YOUR_RESULT.val;
  console.log('error:', error);
  // Further error checking is possible by
  if (error instanceof RequestError) {
    console.log('Hello instance of RequestError!');

    if (error instanceof RequestNotFoundError) {
      console.log('Wow, it looks like you have many instances!');
    }
    if (error instanceof RequestMethodNotAcceptableLegacyError) {
      console.log('Seems, that you take care of your legacy!');
    }
  }
}
```

### Possible Error Instances

#### Regular Errors of type RequestError

```ts
400:
type RequestBadRequestError

401:
type RequestUnauthorizedError

402:
type RequestPaymentRequiredError

403:
type RequestForbiddenError

404:
type RequestNotFoundError

405:
type RequestMethodNotAllowedError

406:
type RequestMethodNotAcceptableError

409:
type RequestConflictError

415:
type RequestUnsupportedMediaTypeError

429:
type RequestTooManyRequestsError

500:
type RequestInternalServerError

503:
type RequestServiceUnavailableError

504:
type RequestGatewayTimeoutError

```

#### Legacy Errors of type RequestError

```ts
400:
type RequestBadRequestLegacyError

406:
type RequestMethodNotAcceptableLegacyError

500:
type RequestInternalServerLegacyError

```

### Retrieve an invoice

```ts
const retrievedInvoice = await client.retrieveInvoice({ YOUR_INVOICE_ID });
```

### Create an invoice

```ts
const createdInvoiceResponse = await client.createInvoice(
  { YOUR_INVOICE_OBJECT_OR_XRECHNUNG },
  { OPTIONAL_FILTER },
);
```

### Upload File ( one option )

```ts
let fs = require('fs');
let FormData = require('form-data');

let data = new FormData();

data.append('file', fs.createReadStream(__dirname + '/yourFolder/yourFile'));
data.append('type', 'voucher');

const uploadedFileResponse = await client.uploadFile(data);
```

## Side notes in addition to the official docs to avoid common errors

### Updating

For updating any type of vouchers where the "version" property is required, you first need to retrieve it and use the current "version" value to properly update.

### Rendering Document File Id

Only possible for any type of vouchers that are not in "draft" mode.

### Download File

The required id is not the id itself, it is the documentFileId, which can be required with the matching

```ts
renderXXXDocumentFileId({ id });
```

methods.
