import { Select } from 'antd';
import { useLocaleStore } from '@/store';
import style from './index.module.less';

export const LocaleSelect: React.FC = () => {
  const { locale, setLocale } = useLocaleStore();
  return (
    <Select
      className={style['locale-select']}
      popupClassName={style['locale-select-popup']}
      defaultValue={locale}
      onChange={setLocale}
    >
      <Select.Option value='en'>English</Select.Option>
      <Select.Option value='zh'>中文</Select.Option>
    </Select>
  );
};

export default LocaleSelect;
