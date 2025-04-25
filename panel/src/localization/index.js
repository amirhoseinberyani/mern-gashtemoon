import fa_tr from './fa'
import en_tr from './en'
import du_tr from './du'

var regex = /^\/en/i
const lang = regex.test(window.location.pathname) ? "en" : "fa"
export { lang }
const directions = {
    fa: "rtl",
    en: "ltr",
    du: "ltr",
}
function getDirection() {
    return directions[lang]
}
export { getDirection }

const translate = {
    fa: fa_tr,
    en: en_tr,
    du: du_tr,
}
function getTranslate() {
    return translate[lang]
}
export { getTranslate }

const fonts = {
    fa: "IRANSans",
    en: "Muli",
    du: "Muli",
}
function getFont() {
    return fonts[lang]
}
export { getFont }

function changeLang(newLang) {
    if (newLang === lang) {
        return
    }
    localStorage.setItem('lang', newLang)
    window.location.reload()
}
export { changeLang }