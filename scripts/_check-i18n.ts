import { en } from '../client/src/i18n/en.js'
import { fa } from '../client/src/i18n/fa.js'
import { de } from '../client/src/i18n/de.js'
import { tr } from '../client/src/i18n/tr.js'
import type { Language } from '../client/src/i18n/types.js'

const dicts: Record<Language, Record<string, string>> = { en, fa, de, tr }
const e = Object.keys(en)
const setE = new Set(e)
let problems = 0
for (const [name, dict] of Object.entries(dicts)) {
  const keys = Object.keys(dict)
  const missing = e.filter((k) => !keys.includes(k))
  const extra = keys.filter((k) => !setE.has(k))
  const empties = keys.filter((k) => !dict[k] || !dict[k].trim())
  const softHyphen = keys.filter((k) => dict[k].includes('­'))
  if (missing.length || extra.length || empties.length || softHyphen.length) problems++
  console.log(`${name}: keys=${keys.length} missing=${missing.length} extra=${extra.length} empty=${empties.length} softHyphen=${softHyphen.length}`)
  if (missing.length) console.log('  missing:', missing)
  if (extra.length) console.log('  extra:', extra)
  if (empties.length) console.log('  empty:', empties)
  if (softHyphen.length) console.log('  softHyphen:', softHyphen)
}
console.log(problems === 0 ? 'I18N_OK' : 'I18N_PROBLEMS')
