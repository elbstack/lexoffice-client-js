<h1 align = "center">lexoffice-client-js</h1>

<p align="center">
  <strong>Javascript client library for the <a href="https://www.lexoffice.de/partner/public-api/">lexoffice Public API<a>.</strong>
</p>

<p align="center"><strong><img src="https://emojis.slackmojis.com/emojis/images/1479745458/1383/typescript.png?1479745458" width="20" height="20"/> fully typed</strong></p>
<p align="center"><strong><img src="/images/promise-logo.png" width="20" height="20"/> promise based</strong></p>
<p align="center"><strong>❌ non throwing</strong></p>

---

## Contents

- [Installation](#installation)
- [Documentation](#documentation)
- [Usage](#usage)
- [Examples](#examples)
  - [Retrieve an invoice](#retrieve-an-invoice)
  - [Create an invoice](#create-an-invoice)
  - [Upload file](#upload-file)

## Installation

```bash
npm install @elbstack/lexoffice-client-js
```

## Documentation

You can find the official <img src="/images/lexoffice_logo_RGB.png" width="80" height="20"/> API documentation [here](https://developers.lexoffice.io/docs/#lexoffice-api-documentation).

## Usage

To get your API Key, you must already be a lexoffice user. Get it [here](https://app.lexoffice.de/settings/#/public-api).

```ts
import { Client } from '@elbstack/lexoffice-client-js';

const client = new Client(YOUR_LEXOFFICE_API_KEY);
```

## Examples

All functions should be 'async' as the clients methods return promises. These promises are formatted by the [ts-results package](https://github.com/vultix/ts-results), for extended error handling see [Error Handling](#error-handling).

### Retrieve an invoice

```ts
const invoiceResult = await client.retrieveInvoice('caf4e0c3-c3e8-4a06-bcfe-346bc7190b2');

if (invoiceResult.ok) {
  const invoice = invoiceResult.val;
} else {
  console.error('An error occured');
}
```

### Create an invoice

```ts
const invoice = {
  voucherDate: '2017-02-22T00:00:00.000+01:00',
  address: {
    name: 'Bike & Ride GmbH & Co. KG',
    supplement: 'Gebäude 10',
    street: 'Musterstraße 42',
    city: 'Freiburg',
    zip: '79112',
    countryCode: 'DE',
  },
  lineItems: [
    {
      type: 'custom',
      name: 'Energieriegel Testpaket',
      quantity: 1,
      unitName: 'Stück',
      unitPrice: {
        currency: 'EUR',
        netAmount: 5,
        taxRatePercentage: 0,
      },
      discountPercentage: 0,
    },
    {
      type: 'text',
      name: 'Strukturieren Sie Ihre Belege durch Text-Elemente.',
      description: 'Das hilft beim Verständnis',
    },
  ],
  totalPrice: {
    currency: 'EUR',
  },
  taxConditions: {
    taxType: 'net',
  },
  shippingConditions: {
    shippingDate: '2017-04-22T00:00:00.000+02:00',
    shippingType: 'delivery',
  },
  title: 'Rechnung',
  introduction: 'Ihre bestellten Positionen stellen wir Ihnen hiermit in Rechnung',
  remark: 'Vielen Dank für Ihren Einkauf',
};

const createdInvoiceResult = await client.createInvoice(invoice, { finalized: true });

if (createdInvoiceResult.ok) {
  const invoice = createdInvoiceResult.val;
} else {
  console.error('An error occured');
}
```

### Upload File ( one option )

```ts
let fs = require('fs');
let FormData = require('form-data');

let data = new FormData();

data.append('file', fs.createReadStream(__dirname + '/yourFolder/yourFile'));
data.append('type', 'voucher');

const uploadedFileResult = await client.uploadFile(data);

if (uploadedFileResult.ok) {
  const invoice = uploadedFileResult.val;
} else {
  console.error('An error occured');
}
```

## Error handling

As mentioned above, the returned promises are formatted by ts-results which is a typescript implementation of Rust's [Result](https://doc.rust-lang.org/std/result/) and [Option](https://doc.rust-lang.org/std/option/) objects. It brings compile-time error checking and optional values to typescript.
If you want to use the advantages of ts-results, all client responses should be processed similar to the following:

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

<table>
<tr>
<th>Error code</th>
<th>Error type in the lexoffice-client-js</th>
<th>Error code</th>
<th>Error type in the lexoffice-client-js</th>
</tr>
<tr>
<td>400</td>
<td>RequestBadRequestError</td>
<td>500</td>
<td>RequestInternalServerError</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</table>

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
