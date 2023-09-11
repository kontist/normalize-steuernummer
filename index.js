'use strict'

const parse = (steuernummer, state) => {
  // Remove slashes and spaces as included in official letters.
  steuernummer = steuernummer.replace(/[/ ]/g, '')

  const statesWith10Digits = new Set([
    'DE-BW',
    'DE-BE',
    'DE-HB',
    'DE-HH',
    'DE-NI',
    'DE-RP',
    'DE-SH',
  ])
  if (steuernummer.length !== 10 && statesWith10Digits.has(state)) {
    throw new TypeError(
      `\`steuernummer\` for ${state} must contain exactly 10 digits`
    )
  }

  const statesWith11Digits = new Set([
    'DE-BY',
    'DE-BB',
    'DE-HE',
    'DE-MV',
    'DE-NW',
    'DE-SL',
    'DE-SN',
    'DE-ST',
    'DE-TH',
  ])
  if (steuernummer.length !== 11 && statesWith11Digits.has(state)) {
    throw new TypeError(
      `\`steuernummer\` for ${state} must contain exactly 11 digits`
    )
  }

  // See “Standardschema der Länder” on https://www.elster.de/eportal/helpGlobal?themaGlobal=wo%5Fist%5Fmeine%5Fsteuernummer%5Feop#aufbauSteuernummer.
  switch (state) {
    case 'DE-BW':
    case 'DE-BE':
    case 'DE-HB':
    case 'DE-HH':
    case 'DE-NI':
    case 'DE-RP':
    case 'DE-SH':
      // Format: FF/BBB/UUUUP.
      return steuernummer.match(
        /(?<ff>\d{2})(?<bbb>\d{3})(?<uuuu>\d{4})(?<p>\d{1})/
      ).groups
    case 'DE-BY':
    case 'DE-BB':
    case 'DE-MV':
    case 'DE-SL':
    case 'DE-SN':
    case 'DE-ST':
    case 'DE-TH':
      // Format: FFF/BBB/UUUUP.
      return steuernummer.match(
        /(?<fff>\d{3})(?<bbb>\d{3})(?<uuuu>\d{4})(?<p>\d{1})/
      ).groups
    case 'DE-HE':
      // Format: 0FF/BBB/UUUUP.
      return steuernummer.match(
        /0(?<ff>\d{2})(?<bbb>\d{3})(?<uuuu>\d{4})(?<p>\d{1})/
      ).groups
    case 'DE-NW':
      // Format: FFF/BBBB/UUUP.
      return steuernummer.match(
        /(?<fff>\d{3})(?<bbbb>\d{4})(?<uuu>\d{3})(?<p>\d{1})/
      ).groups
    default:
      throw new TypeError('`state` must be a German ISO 3166-2 code')
  }
}

const compile = (tokens, state) => {
  const { ff, fff, bbb, bbbb, uuu, uuuu, p } = tokens

  // See “Vereinheitlichtes Bundesschema” on https://www.elster.de/eportal/helpGlobal?themaGlobal=wo%5Fist%5Fmeine%5Fsteuernummer%5Feop#aufbauSteuernummer.
  switch (state) {
    case 'DE-BW':
      return `28${ff}0${bbb}${uuuu}${p}`
    case 'DE-BY':
      return `9${fff}0${bbb}${uuuu}${p}`
    case 'DE-BE':
      return `11${ff}0${bbb}${uuuu}${p}`
    case 'DE-BB':
    case 'DE-SN':
    case 'DE-ST':
      return `3${fff}0${bbb}${uuuu}${p}`
    case 'DE-HB':
      return `24${ff}0${bbb}${uuuu}${p}`
    case 'DE-HH':
      return `22${ff}0${bbb}${uuuu}${p}`
    case 'DE-HE':
      return `26${ff}0${bbb}${uuuu}${p}`
    case 'DE-MV':
    case 'DE-TH':
      return `4${fff}0${bbb}${uuuu}${p}`
    case 'DE-NI':
      return `23${ff}0${bbb}${uuuu}${p}`
    case 'DE-NW':
      return `5${fff}0${bbbb}${uuu}${p}`
    case 'DE-RP':
      return `27${ff}0${bbb}${uuuu}${p}`
    case 'DE-SL':
      return `1${fff}0${bbb}${uuuu}${p}`
    case 'DE-SH':
      return `21${ff}0${bbb}${uuuu}${p}`
  }
}

const normalizeSteuernummer = (steuernummer, state) => {
  if (typeof steuernummer !== 'string') {
    throw new TypeError('`steuernummer` must be a string')
  }

  if (typeof state !== 'string') {
    throw new TypeError('`state` must be a string')
  }

  const tokens = parse(steuernummer, state)
  return compile(tokens, state)
}

const reverseNormalized = (normalized) => {
  if (typeof normalized !== 'string') {
    throw new TypeError('`normalized` must be a string')
  }

  // Extract potential components from normalized string
  const fff = normalized.substr(1, 3)
  const ff = normalized.substr(2, 2)
  const bbb = normalized.substr(5, 3)
  const bbbb = normalized.substr(5, 4)
  const uuuu = normalized.substr(8, 4)
  const uuu = normalized.substr(9, 3)
  const p = normalized.substr(normalized.length - 1, 1)

  let state
  let steuernummer

  switch (normalized.substr(0, 2)) {
    case '28':
      state = 'DE-BW'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    case '9':
      state = 'DE-BY'
      steuernummer = `${fff}/${bbb}/${uuuu}${p}`
      break
    case '11':
      state = 'DE-BE'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    case '3':
      state = ['DE-BB', 'DE-SN', 'DE-ST'] // Ambiguous state
      steuernummer = `${fff}/${bbb}/${uuuu}${p}`
      break
    case '24':
      state = 'DE-HB'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    case '22':
      state = 'DE-HH'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    case '26':
      state = 'DE-HE'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    case '4':
      state = ['DE-MV', 'DE-TH'] // Ambiguous state
      steuernummer = `${fff}/${bbb}/${uuuu}${p}`
      break
    case '23':
      state = 'DE-NI'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    case '5':
      state = 'DE-NW'
      steuernummer = `${fff}/${bbbb}/${uuu}${p}`
      break
    case '27':
      state = 'DE-RP'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    case '1':
      state = 'DE-SL'
      steuernummer = `${fff}/${bbb}/${uuuu}${p}`
      break
    case '21':
      state = 'DE-SH'
      steuernummer = `${ff}/${bbb}/${uuuu}${p}`
      break
    default:
      throw new TypeError('Unknown normalized format')
  }

  return {
    state,
    steuernummer,
  }
}

module.exports = {
  normalizeSteuernummer,
  reverseNormalized,
}
