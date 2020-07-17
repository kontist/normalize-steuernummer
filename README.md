# normalize-steuernummer

> Normalize a German tax number (*Steuernummer*) to the national format

## Installation

```console
$ npm install normalize-steuernummer
```

## Usage

```js
const normalizeSteuernummer = require('normalize-steuernummer')

normalizeSteuernummer('21/815/08150', 'DE-BE')
// => "1121081508150"

normalizeSteuernummer('75 815 08152', 'DE-HB')
// => "2475081508152"
```

## API

### normalizeSteuernummer(steuernummer, state)

#### steuernummer

Type: `string`

[German tax number](https://de.wikipedia.org/wiki/Steuernummer#Deutschland) (*Steuernummer*).

#### state

Type: `string`

State (*Bundesland*) as [ISO 3166-2 code](https://en.wikipedia.org/wiki/ISO_3166-2:DE).
