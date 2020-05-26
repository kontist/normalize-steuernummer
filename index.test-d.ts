import { expectType, expectError } from 'tsd'
import normalizeSteuernummer = require('.')

expectType<string>(normalizeSteuernummer('21/815/08150', 'DE-BE'))
expectError(normalizeSteuernummer('21/815/08150', 'AT-9'))
