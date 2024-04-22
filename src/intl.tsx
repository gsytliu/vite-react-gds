// 国际化
import {
  FormattedMessage,
  IntlProvider,
  useIntl,
  type IntlShape,
} from 'react-intl';
import { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import { useLocaleStore } from './store';

// 自定义语言加载器
const loadMsgs = async (l = 'en') => {
  const res = await axios({
    method: 'get',
    url: `/locales/${l}.json?${_STAMP_}`,
  });
  return res.data;
};

const localesLoader = {
  en: {
    getMessages: () => loadMsgs('en'),
    getAntdLocale: () => import('antd/es/locale/en_US'),
  },
  zh: {
    getMessages: () => loadMsgs('zh'),
    getAntdLocale: () => import('antd/es/locale/zh_CN'),
  },
};

interface IntlProps {
  children: React.ReactNode;
}

interface IntlCaptureProps extends IntlProps {}

let intl: IntlShape;

const IntlCapture: React.FC<IntlCaptureProps> = ({ children }) => {
  intl = useIntl();
  return <>{children}</>;
};

export const IntlWrapper: React.FC<IntlProps> = ({ children }) => {
  const { locale } = useLocaleStore();
  const [intlLocale, setIntlLocale] = useState({
    antdLocale: null as any,
    messages: null as any,
  });

  useEffect(() => {
    const { getMessages, getAntdLocale } = localesLoader[locale];
    Promise.all([getMessages(), getAntdLocale()]).then(
      ([messages, antdLocale]) => {
        const _intlLocale = {
          messages: messages,
          antdLocale: antdLocale.default,
        };
        setIntlLocale(_intlLocale);
      },
    );
  }, [locale]);

  const { antdLocale, messages } = intlLocale;

  if (!antdLocale || !messages) return null;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <IntlCapture>
        <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
      </IntlCapture>
    </IntlProvider>
  );
};

// 方便使用
export const $t = (id: string, values?: Record<string, string>) => {
  return intl.formatMessage({ id }, values);
};

export const $fm = (
  id: string,
  values?: Record<string, string | number>,
): React.ReactNode => {
  return <FormattedMessage id={id} values={values}></FormattedMessage>;
};
