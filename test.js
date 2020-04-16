'use strict'

const assert = require('assert')
const normalizeSteuernummer = require('.')

// From “Tabelle 4-1” in https://download.elster.de/download/schnittstellen/Pruefung_der_Steuer_und_Steueridentifikatsnummer.pdf as of 2020-02-21.
const elsterExamples = [
  { steuernummer: '66815/08156', stateCode: 'DE-BW', expected: '2866081508156', stateName: 'Baden-Württemberg' },
  { steuernummer: '198/815/08152', stateCode: 'DE-BY', expected: '9198081508152', stateName: 'Bayern (München)' },
  { steuernummer: '296/815/08153', stateCode: 'DE-BY', expected: '9296081508153', stateName: 'Bayern (Nürnberg)' },
  { steuernummer: '97/815/08154', stateCode: 'DE-BE', expected: '1197081508154', stateName: 'Berlin' },
  { steuernummer: '098/815/08157', stateCode: 'DE-BB', expected: '3098081508157', stateName: 'Brandenburg' },
  { steuernummer: '97 123 01233', stateCode: 'DE-HB', expected: '2497012301233', stateName: 'Bremen' },
  { steuernummer: '41/815/08154', stateCode: 'DE-HH', expected: '2241081508154', stateName: 'Hamburg' },
  { steuernummer: '053 815 08158', stateCode: 'DE-HE', expected: '2653081508158', stateName: 'Hessen' },
  { steuernummer: '098/815/08157', stateCode: 'DE-MV', expected: '4098081508157', stateName: 'Mecklenburg-Vorpommern' },
  { steuernummer: '88/815/08158', stateCode: 'DE-NI', expected: '2388081508158', stateName: 'Niedersachsen' },
  { steuernummer: '400/8150/8159', stateCode: 'DE-NW', expected: '5400081508159', stateName: 'NRW (54)' },
  { steuernummer: '500/8150/8151', stateCode: 'DE-NW', expected: '5500081508151', stateName: 'NRW (55)' },
  { steuernummer: '600/8150/8154', stateCode: 'DE-NW', expected: '5600081508154', stateName: 'NRW (56)' },
  { steuernummer: '99/815/08152', stateCode: 'DE-RP', expected: '2799081508152', stateName: 'Rheinland-Pfalz' },
  { steuernummer: '096/815/08187', stateCode: 'DE-SL', expected: '1096081508187', stateName: 'Saarland' },
  { steuernummer: '248/815/08156', stateCode: 'DE-SN', expected: '3248081508156', stateName: 'Sachsen' },
  { steuernummer: '198/815/08152', stateCode: 'DE-ST', expected: '3198081508152', stateName: 'Sachsen-Anhalt' },
  { steuernummer: '38/815/08154', stateCode: 'DE-SH', expected: '2138081508154', stateName: 'Schleswig-Holstein' },
  { steuernummer: '198/815/08152', stateCode: 'DE-TH', expected: '4198081508152', stateName: 'Thüringen' }
]

for (const example of elsterExamples) {
  it(`normalizes a Steuernummer from ${example.stateName}`, () => {
    assert.strictEqual(normalizeSteuernummer(example.steuernummer, example.stateCode), example.expected)
  })
}

it('throws an error if steuernummer is not a string', () => {
  assert.throws(() => normalizeSteuernummer(2181508150), {
    name: 'TypeError',
    message: '`steuernummer` must be a string'
  })
})

it('throws an error if steuernummer does not contain 10 digits', () => {
  assert.throws(() => normalizeSteuernummer('181/815/08155', 'DE-BE'), {
    name: 'TypeError',
    message: '`steuernummer` for DE-BE must contain exactly 10 digits'
  })
})

it('throws an error if steuernummer does not contain 11 digits', () => {
  assert.throws(() => normalizeSteuernummer('21/815/08150', 'DE-BY'), {
    name: 'TypeError',
    message: '`steuernummer` for DE-BY must contain exactly 11 digits'
  })
})

it('throws an error if state is not a string', () => {
  assert.throws(() => normalizeSteuernummer('21/815/08150', 1), {
    name: 'TypeError',
    message: '`state` must be a string'
  })
})
