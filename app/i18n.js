/**
 * i18n.js
 * 다국어 지원
 */
import { addLocaleData } from 'react-intl';

import koLocaleData from 'react-intl/locale-data/ko';
import enLocaleData from 'react-intl/locale-data/en';

import { DEFAULT_LOCALE } from '../app/containers/App/constants';

import koTranslationMessages from './translations/ko.json';
import enTranslationMessages from './translations/en.json';

addLocaleData(koLocaleData);
addLocaleData(enLocaleData);

export const appLocales = [
    'ko',
    'en',
];

// 메세지 변환
export const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE
        ? formatTranslationMessages(DEFAULT_LOCALE, koTranslationMessages)
        : {};
    return Object.keys(messages).reduce((formattedMessages, key) => {
        const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
            ? defaultFormattedMessages[key]
            : messages[key];
        return Object.assign(formattedMessages, { [key]: formattedMessage });
    }, {});
};

export const translationMessages = {
    ko: formatTranslationMessages('ko', koTranslationMessages),
    en: formatTranslationMessages('en', enTranslationMessages),
};
