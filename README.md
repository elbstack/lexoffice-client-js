<h1 align = "center">lexoffice-client-js</h1>

<p align="center">
  <strong>Javascript client library for the <a href="https://www.lexoffice.de/partner/public-api/">lexoffice Public API<a>.</strong>
</p>

<p align="center"><strong><img src="https://emojis.slackmojis.com/emojis/images/1479745458/1383/typescript.png?1479745458" width="20" height="20"/> fully typed</strong></p>
<p align="center"><strong><img src="/images/promise-logo.png" width="20" height="20"/> promise based</strong></p>
<p align="center"><strong>❌ non throwing</strong></p>
<br>
<p align="center">
  <a href="https://github.com/elbstack/lexoffice-client-js">
    <img src="https://badgen.net/badge/-/github?icon=github&label" alt="GitHub" />
  </a>
  <a href="https://github.com/elbstack/lexoffice-client-js/stargazers">
    <img src="https://badgen.net/github/stars/elbstack/lexoffice-client-js" alt="GitHub Stars"/>
  </a>
    <a>
    <img alt="npm (latest)" src="https://img.shields.io/npm/v/elbstack/latest"/>
  </a>
  <a>
    <img alt="npm (develop)" src="https://img.shields.io/npm/v/elbstack/develop?color=%23e044aa"/>
  </a>
    <br>
  <a href="https://github.com/badges/shields/pulse" >
    <img src="https://img.shields.io/github/commit-activity/m/elbstack/lexoffice-client-js" alt="Activity" />        
  </a>
  <a href="https://github.com/elbstack/lexoffice-client-js/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/elbstack/lexoffice-client-js" alt="Contributors" />
  </a>
  <a href="https://github.com/elbstack/lexoffice-client-js/blob/main/LICENSE">
    <img
      src="https://badgen.net/badge/license/MIT/blue"
      alt="MIT license"
    />
  </a>

</p>

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

You can find the official lexoffice API documentation [here](https://developers.lexoffice.io/docs/#lexoffice-api-documentation).

<h2 name="usage" >🔑 Usage</h2>

To get your API Key, you must already be a lexoffice user. Get it [here](https://app.lexoffice.de/settings/#/public-api).

```ts
import { Client } from '@elbstack/lexoffice-client-js';

const client = new Client(YOUR_LEXOFFICE_API_KEY);
```

<h2 name="examples">💡 Examples</h2>

All functions are promise based. These promises are formatted by the [ts-results package](https://github.com/vultix/ts-results), for extended error handling see [Error handling](#error-handling).

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

### Upload File

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

### Error codes and types

<table>
<th colspan="4">Regular errors</th>
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
<th colspan="4">Legacy errors (used by the endpoints files, profiles and contacts)</th>
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

createContact(contact: ContactCreatePerson | ContactCreateCompany): Promise<Result<ContactCreateResponse, RequestError>>

retrieveContact(id: string): Promise<Result<ContactRetrieveResponse, RequestError>>

updateContact(id: string, contact: ContactUpdatePerson | ContactUpdateCompany): Promise<Result<ContactUpdateResponse, RequestError>>

filterContact(filter?: OptionalFilters & Partial<PagingParameters>): Promise<Result<ContactFilterRetrieveResponse, RequestError>>
```

### Country

```ts
retrieveListOfCountries(): Promise<Result<Country[], RequestError>>
```

### Credit note

```ts
createCreditNote(creditNote: CreditNoteCreate, optionalFinalized?: OptionalFinalized): Promise<Result<CreditNoteCreateResponse, RequestError>>

retrieveCreditNote(id: string): Promise<Result<CreditNoteRetrieveResponse, RequestError>>

renderCreditNoteDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>>
```

### Down payment invoice

```ts
retrieveDownPaymentInvoice(id: string): Promise<Result<DownPaymentInvoice, RequestError>>
```

### Event subscription

```ts
createEventSubscription(eventSubscription: EventSubscriptionCreate): Promise<Result<EventSubscription, RequestError>>

retrieveEventSubscription(id: string): Promise<Result<EventSubscription, RequestError>>

retrieveAllEventSubscriptions(): Promise<Result<EventSubscriptions, RequestError>>

deleteEventSubscription(id: string): Promise<Result<unknown, RequestError>>
```

### File

```ts
uploadFile(data: FormData): Promise<Result<FileResponse, RequestError>>

downloadFile(documentFileId: string, optionalParameter?: RenderType): Promise<Result<unknown, RequestError>>
```

### Invoice

```ts
createInvoice(invoice: InvoiceCreate | XRechnung, optionalFinalized?: OptionalFinalized): Promise<Result<InvoiceCreateResponse, RequestError>>

retrieveInvoice(id: string): Promise<Result<InvoiceRetrieveResponse, RequestError>>

renderInvoiceDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>>
```

### Order confirmation

```ts
createOrderConfirmation(orderConfirmation: OrderConfirmation): Promise<Result<OrderConfirmationResponse, RequestError>>

retrieveOrderConfirmation(id: string): Promise<Result<OrderConfirmationRetrieveResponse, RequestError>>

renderOrderConfirmationDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>>
```

### Payment

```ts
retrievePayment(id: string): Promise<Result<Payment, RequestError>>
```

### Payment condition

```ts
retrievePaymentConditionList(): Promise<Result<PaymentCondition, RequestError>>
```

### Posting category

```ts
retrieveListPostingCategories(): Promise<Result<PostingCategory[], RequestError>>
```

### Profile

```ts
retrieveProfile(): Promise<Result<Profile, RequestError>>
```

### Quotation

```ts
createQuotation(quotation: QuotationCreate, optionalFilter?: OptionalFinalized): Promise<Result<QuotationCreate, RequestError>>

retrieveQuotation(id: string): Promise<Result<Partial<Quotation>, RequestError>>

renderQuotationDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>>
```

### Recurring template

```ts
retrieveRecurringTemplate(id: string): Promise<Result<Partial<RecurringTemplate>, RequestError>>

retrieveAllRecurringTemplates(optionalFilter?: PagingParameters): Promise<Result<RecurringTemplates, RequestError>>
```

### Voucher

```ts
createVoucher(voucher: CreateVoucher): Promise<Result<VoucherCreateResponse, RequestError>>

retrieveVoucher(id: string): Promise<Result<Partial<Voucher>, RequestError>>

updateVoucher(id: string, voucher: CreateVoucher): Promise<Result<VoucherCreateResponse, RequestError>>

filterVoucher(voucherNumber: VoucherNumber): Promise<Result<Partial<Vouchers>, RequestError>>

uploadFileToVoucher(data: FormData, id: string): Promise<Result<FileResponse, RequestError>>
```

### Voucherlist

```ts
retrieveVoucherlist(filterParameter: FilterParameter): Promise<Result<Voucherlist, RequestError>>
```

<h2 name="side-notes">🔖 Side notes</h2>

### Updating

For updating any type of vouchers where the "version" property is required, you first need to retrieve it and use the current "version" value to properly update.

### Rendering Document File Id

Only possible for any type of vouchers that are not in "draft" mode.

### Download File

The required id is not the id itself, it is the documentFileId, which can be required with the matching methods and the vouchers id:

```ts
renderCreditNoteDocumentFileId(id);
renderInvoiceDocumentFileId(id);
renderOrderConfirmationDocumentFileId(id);
renderQuotationDocumentFileId(id);
```

<h2 name="about"><img src="images/favicon-32x32.png" width="30" height="30"/> This package has been brought to you by elbstack!</h2>

elbstack is a software engineering & design company. We question, we advise, and we're excited to help your next project to succeed.<br>
We offer software development and design as service. That's how we support you with the realisation of your projects - with individual employees or with a whole team. We love to work remotely, but we will work at your place, too.

### 👩🏻‍💻👨🏽‍💻 We are hiring!

<p>We are more than a classic software agency, rather like a highly self organized company with our own start-up incubator. You can choose how much, for whom and what you want to work for. Acquire your own customers and projects, simply make your sideproject become reality or even a proper start-up.</p>
<p>Sounds like a scam?</p>

<a href="https://www.kununu.com/de/elbstack2">➡️ Go and check kununu.com</a><br>
<a href="https://elbstack.com">➡️ elbstack.com</a>
