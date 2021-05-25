<h1 align = "center">lexoffice-client-js</h1>

<p align="center">
  <strong>Javascript client library for the <a href="https://www.lexoffice.de/partner/public-api/">lexoffice Public API<a>.</strong>
</p>

<p align="center"><strong><img src="https://emojis.slackmojis.com/emojis/images/1479745458/1383/typescript.png?1479745458" width="20" height="20"/> fully typed</strong></p>
<p align="center"><strong><img src="/images/promise-logo.png" width="20" height="20"/> promise based</strong></p>
<p align="center"><strong>❌ non throwing</strong></p>

---

## 📦 Contents

- [⚙️ Installation](#installation)
- [📚 Documentation](#documentation)
- [🔑 Usage](#usage)
- [💡 Examples](#examples)
  - [Retrieve an invoice](#retrieve-an-invoice)
  - [Create an invoice](#create-an-invoice)
  - [Upload file](#upload-file)
- [❌ Error handling](#error-handling)
- [🛠 Provided methods grouped by endpoint](#provided-methods)
  - [Contact](#contact)
  - [Country](#country)
  - [Credit note](#credit-note)
  - [Down payment invoice](#down-payment-invoice)
  - [Event subscription](#event-subscription)
  - [File](#file)
  - [Invoice](#invoice)
  - [Order confirmation](#order-confirmation)
  - [Payment](#payment)
  - [Payment condition](#payment-condition)
  - [Posting category](#posting-category)
  - [Profile](#profile)
  - [Quotation](#quotation)
  - [Recurring Template](#recurring-template)
  - [Voucher](#voucher)
  - [Voucherlist](#voucherlist)
- [🔖 Side notes](#side-notes)
<ul><li><a href="#about"><img src="/images/favicon-32x32.png"width="20" height="20"/> About us</a></li></ul>

---

<h2 name="installation" >⚙️ Installation</h2>

```bash
npm install @elbstack/lexoffice-client-js
```

<h2 name="documentation">📚 Documentation</h2>

You can find the official <img src="/images/lexoffice_logo_RGB.png" width="80" height="16"/> API documentation [here](https://developers.lexoffice.io/docs/#lexoffice-api-documentation).

To get your API Key, you must already be a lexoffice user. Get it [here](https://app.lexoffice.de/settings/#/public-api).

```ts
import { Client } from '@elbstack/lexoffice-client-js';

const client = new Client(YOUR_LEXOFFICE_API_KEY);
```

<h2 name="examples">💡 Examples</h2>

All functions should be 'async' as the clients methods return promises. These promises are formatted by the [ts-results package](https://github.com/vultix/ts-results), for extended error handling see [Error handling](#error-handling).

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

<h2 name="error-handling">❌ Error handling</h2>

As mentioned above, the returned promises are formatted by ts-results which is a typescript implementation of Rust's [Result](https://doc.rust-lang.org/std/result/) and [Option](https://doc.rust-lang.org/std/option/) objects. It brings compile-time error checking and optional values to typescript.
All errors are instances of type RequestError.
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

#### Error codes and types

<table>
<th>Regular errors</th>
<tr>
<th width="15%">❌ Error code</th>
<th width="35%"><img src="https://emojis.slackmojis.com/emojis/images/1479745458/1383/typescript.png?1479745458" width="20" height="20"/> Error type</th>
<th width="15%">❌ Server error code</th>
<th width="35%"><img src="https://emojis.slackmojis.com/emojis/images/1479745458/1383/typescript.png?1479745458" width="20" height="20"/> Error type</th>
</tr>
<tr>
<td>400</td>
<td>RequestBadRequestError</td>
<td>500</td>
<td>RequestInternalServerError</td>
</tr>
<tr>
<td>401</td>
<td>RequestUnauthorizedError</td>
<td>503</td>
<td>RequestServiceUnavailableError</td>
</tr>
<tr>
<td>402</td>
<td>RequestPaymentRequiredError</td>
<td>504</td>
<td>RequestGatewayTimeoutError</td>
</tr>
<tr>
<td>403</td>
<td>RequestForbiddenError</td>
<td></td>
<td></td>
</tr>
<tr>
<td>404</td>
<td>RequestNotFoundError</td>
<td></td>
<td></td>
</tr>
<tr>
<td>405</td>
<td>RequestMethodNotAllowedError</td>
<td></td>
<td></td>
</tr>
<tr>
<td>406</td>
<td>RequestMethodNotAcceptableError</td>
<td></td>
<td></td>
</tr>
<tr>
<td>409</td>
<td>RequestConflictError</td>
<td></td>
<td></td>
</tr>
<tr>
<td>415</td>
<td>RequestUnsupportedMediaTypeError</td>
<td></td>
<td></td>
</tr>
<tr>
<td>429</td>
<td>RequestTooManyRequestsError</td>
<td></td>
<td></td>
</tr>
<th>Legacy errors (used by the endpoints files, profiles and contacts)</th>
<tr>
<td>400</td>
<td>RequestBadRequestLegacyError</td>
<td>500</td>
<td>RequestInternalServerLegacyError</td>
</tr>
<tr>
<td>406</td>
<td>
RequestMethodNotAcceptableLegacyError</td>
<td></td>
<td></td>
</tr>
</table>

<h2 name="provided-methods">🛠 Provided methods grouped by endpoint</h2>

The following list does not contain required arguments.

### Contact

```ts
updateContact());
filterContact();
```

### Country

```ts
retrieveListOfCountries();
```

### Credit note

```ts
createCreditNote();
retrieveCreditNote();
renderCreditNoteDocumentFileId();
```

### Down payment invoice

```ts
retrieveDownPaymentInvoice();
```

### Event subscription

```ts
createEventSubscription();
retrieveEventSubscription();
retrieveAllEventSubscriptions();
deleteEventSubscription();
```

### File

```ts
uploadFile();
downloadFile();
```

### Invoice

```ts
createInvoice();
retrieveInvoice();
renderInvoiceDocumentFileId();
```

### Order confirmation

```ts
createOrderConfirmation();
retrieveOrderConfirmation();
renderOrderConfirmationDocumentFileId();
```

### Payment

```ts
retrievePayment();
```

### Payment condition

```ts
retrievePaymentConditionList();
```

### Posting category

```ts
retrieveListPostingCategories();
```

### Profile

```ts
retrieveProfile();
```

### Quotation

```ts
createQuotation();
retrieveQuotation();
renderQuotationDocumentFileId();
```

### Recurring template

```ts
retrieveRecurringTemplate();
retrieveAllRecurringTemplates();
```

### Voucher

```ts
createVoucher();
retrieveVoucher();
updateVoucher();
filterVoucher();
uploadFileToVoucher();
```

### Voucherlist

```ts
retrieveVoucherlist();
```

<h2 name="side-notes">🔖 Side notes</h2>

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

<h2 name="about"><img src="images/favicon-32x32.png" width="30" height="30"/> About Elbstack</h2>
