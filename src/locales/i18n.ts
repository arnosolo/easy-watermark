import { createI18n } from 'vue-i18n'
import us from "./lang/us.json";
import cn from "./lang/cn.json";
import fr from "./lang/fr.json";
// import de from "./lang/de.json";
import es from "./lang/es.json";
import it from "./lang/it.json";
import jp from "./lang/jp.json";
import kr from "./lang/kr.json";
// import sg from "./lang/sg.json";
import tw from "./lang/tw.json";

const messages = {
  cn, 
  us, 
  // sg, 
  fr, 
  // de, 
  es, 
  it, 
  jp, 
  kr, 
  tw
}

const i18n = createI18n({
  legacy: false,
  // globalInjection: true,
  locale: 'us',
  messages
})

export const languageName = {
  cn: "简体中文",
  us: "English",
  sg: "English",
  de: "español",
  es: "español",
  jp: "日本",
  kr: "한국인",
  tw: "繁體中文",
  fr: "Français",
  it: "Italiano"
}

export function setLanguage(lang: any) {
  if(i18n.global.availableLocales.includes(lang)) {
    i18n.global.locale.value = lang
  } else {
    console.error(`${lang} is not available in i18n, valid options: ${i18n.global.availableLocales.join(', ')}`)
  }
}

export default i18n