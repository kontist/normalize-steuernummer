declare namespace normalizeSteuernummer {
  // See https://github.com/typescript-eslint/typescript-eslint/issues/2867.
  // eslint-disable-next-line no-unused-vars
  type State =
    | 'DE-BW'
    | 'DE-BY'
    | 'DE-BE'
    | 'DE-BB'
    | 'DE-HB'
    | 'DE-HH'
    | 'DE-HE'
    | 'DE-MV'
    | 'DE-NI'
    | 'DE-NW'
    | 'DE-RP'
    | 'DE-SL'
    | 'DE-SN'
    | 'DE-ST'
    | 'DE-SH'
    | 'DE-TH'
}

// See https://github.com/typescript-eslint/typescript-eslint/issues/1856.
// eslint-disable-next-line no-redeclare
declare const normalizeSteuernummer: (
  /**
  Normalize a German tax number (*Steuernummer*) to the national format

  @param steuernummer - [German tax number](https://de.wikipedia.org/wiki/Steuernummer#Deutschland) (*Steuernummer*).
  @param state - State (*Bundesland*) as [ISO 3166-2 code](https://en.wikipedia.org/wiki/ISO_3166-2:DE).
  @returns German tax number (*Steuernummer*) in the national format.

  @example
  ```
  import normalizeSteuernummer = require('normalize-steuernummer')

  normalizeSteuernummer('21/815/08150', 'DE-BE')
  ```
  */
  steuernummer: string,
  state: normalizeSteuernummer.State
) => string

export = normalizeSteuernummer
