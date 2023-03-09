import type { I18n } from "@lingui/core";
import { en, fr } from "make-plural/plurals";

//anounce which locales we are going to use and connect them to approprite plural rules
export function initTranslation(i18n: I18n): void {
  i18n.loadLocaleData({
    en: { plurals: en },
    fr: { plurals: fr },
    pseudo: { plurals: en },
  });
}

export async function loadTranslation(locale: string, isProduction = true) {
  let data;
  if (isProduction) {
    data = await import(`../locales/${locale}/messages`);
  } else {
    data = await import(`@lingui/loader!../locales/${locale}/messages.po`);
  }

  return data.messages;
}
