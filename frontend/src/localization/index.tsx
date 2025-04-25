import { flags } from 'assets'
import EN_US from './en'
import FA_IR from './fa'

const lang: string | null =
  localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'fa'
export { lang }

const directions: {
  fa: 'rtl'
  en: 'ltr'
} = {
  fa: 'rtl',
  en: 'ltr',
}

const direction: 'rtl' | 'ltr' = directions[lang as keyof typeof directions]
export { direction }

const font: {
  fa: string
  en: string
} = {
  fa: 'IRANSans',
  en: 'Poppins',
}

function getFonts() {
  return font[lang as keyof typeof font]
}
export { getFonts }

const icon = {
  en: flags.uk,
  fa: flags.persian,
  tr: flags.turkey,
}

function getIcon() {
  return icon[lang as keyof typeof icon]
}
export { getIcon }

const translates = {
  en: EN_US,
  fa: FA_IR,
}

const translate = translates[lang as keyof typeof translates]

export { translate }

function changeLanguage(lang: string) {
  localStorage.setItem('lang', lang)
  window.location.reload()
}
export { changeLanguage }
