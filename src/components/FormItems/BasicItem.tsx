import { Form, type FormItemProps } from 'antd';
import cn from 'classnames';
import { $fm } from '@/intl';

const FormItem = Form.Item;

export interface BasicItemProps extends FormItemProps {
  name?: string | (string | number)[];
  lang?: string;
  tip?: string;
  isAccess?: boolean;
  visible?: boolean;
  shl?: boolean;
}

export const BasicItem: React.FC<BasicItemProps> = ({
  children,
  label,
  tooltip,
  visible = true,
  // template传入
  isAccess = true,
  lang,
  tip,
  name,
  shl,
  ...rest
}) => {
  const _hidden = !isAccess || !visible;
  const _label = label || (lang ? $fm(lang) : '');
  // eslint-disable-next-line prettier/prettier
  const _tooltip =
    tip === '' ? '' : (tip && $fm(tip)) || (lang && $fm(lang + '_TT')) || '';
  return (
    <FormItem
      className={cn(['basic-item', { shl }])}
      label={_label}
      name={name}
      hidden={_hidden}
      tooltip={_tooltip}
      colon={false}
      {...rest}
    >
      {children}
    </FormItem>
  );
};
