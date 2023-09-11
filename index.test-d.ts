import { expectType, expectError } from 'tsd'
import { normalizeSteuernummer, reverseNormalized } from '.'

// Testing normalizeSteuernummer
expectType<string>(normalizeSteuernummer('21/815/08150', 'DE-BE'))
expectError(normalizeSteuernummer('21/815/08150', 'AT-9'))

// Testing reverseNormalized
const reverseOutput = reverseNormalized('1121081508150')
expectType<string>(reverseOutput.steuernummer)
expectType<normalizeSteuernummer.State | normalizeSteuernummer.State[]>(
  reverseOutput.state
)
