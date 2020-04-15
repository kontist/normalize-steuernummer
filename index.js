'use strict'

const parse = (steuernummer, state) => {
  // Remove slashes and spaces as included in official letters.
  steuernummer = steuernummer.replace(/[/ ]/g, '')

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
      return steuernummer.match(/(?<ff>\d{2})(?<bbb>\d{3})(?<uuuu>\d{4})(?<p>\d{1})/).groups
    case 'DE-BY':
    case 'DE-BB':
    case 'DE-MV':
    case 'DE-SL':
    case 'DE-SN':
    case 'DE-ST':
    case 'DE-TH':
      // Format: FFF/BBB/UUUUP.
      return steuernummer.match(/(?<fff>\d{3})(?<bbb>\d{3})(?<uuuu>\d{4})(?<p>\d{1})/).groups
    case 'DE-HE':
      // Format: 0FF/BBB/UUUUP.
      return steuernummer.match(/0(?<ff>\d{2})(?<bbb>\d{3})(?<uuuu>\d{4})(?<p>\d{1})/).groups
    case 'DE-NW':
      // Format: FFF/BBBB/UUUP.
      return steuernummer.match(/(?<fff>\d{3})(?<bbbb>\d{4})(?<uuu>\d{3})(?<p>\d{1})/).groups
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

module.exports = (steuernummer, state) => {
  const tokens = parse(steuernummer, state)
  return compile(tokens, state)
}
