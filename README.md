# lexoffice-client-js

Node.js/Typescript client library for the [lexoffice Public API](https://www.lexoffice.de/partner/public-api/).

## Installation

```bash
npm install lexoffice-client-js
```

## Documentation

You can find the lexoffice API documentation [here](https://developers.lexoffice.io/docs/#lexoffice-api-documentation).

## Usage

To get your API Key, you must already be a lexoffice user. Get it [here](https://app.lexoffice.de/settings/#/public-api).

**Side note for literal types**

Some type properties are typed as literal types, as there may be just one/a few options accepted by the lexoffice API. In this case for posting any sort of data, either add "as const" to the literally typed property or do not type the whole object at all.

**Running**

```js
const { Client } = require('lexoffice-client-js');
```

**Type Checking**

```js
import { Client } from ('lexoffice-client-js');
```

**Both cases**

```js
const client = new Client({ YOUR_API_KEY });
```

## Examples

### Retrieve an invoice

```js
const retrievedInvoice = await client.retrieveInvoice({ YOUR_INVOICE_ID });
```

### Create an invoice

```js
const createdInvoiceResponse = await client.createInvoice(
  { YOUR_INVOICE_OBJECT_OR_XRECHNUNG },
  { OPTIONAL_BOOLEAN },
);
```

### Upload File

```js
let fs = require('fs');
let FormData: {
  new(form?: HTMLFormElement | undefined): FormData,
  prototype: FormData,
} = require('form-data');

let data = new FormData();

data.append('file', fs.createReadStream(__dirname + '/yourFolder/yourFile'));
data.append('type', 'voucher');

const uploadedFileResponse = await client.uploadFile(data);
```

### Download File

**Note: The required id is not the id itself, it is the documentFileId, which comes as a key of the "files" property while retrieving any sort of voucher.s**
