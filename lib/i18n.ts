import type { I18nConfig } from 'fumadocs-core/i18n';

export type languagesType = 'zh-cn';

export const LANGUAGES: Array<languagesType> = ['zh-cn'];

export const i18n: I18nConfig = {
  defaultLanguage: 'zh-cn',
  languages: LANGUAGES,
  hideLocale: 'default-locale',
};

export const locales: Array<{ name: string; locale: languagesType }> = [
  { name: '简体中文', locale: 'zh-cn' },
];

export function getLanguageSlug(lang: string) {
  return lang == i18n.defaultLanguage ? '' : `/${lang}`;
}
