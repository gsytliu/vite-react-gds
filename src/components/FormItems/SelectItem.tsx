import { Select } from 'antd';
import { BasicItem, type BasicItemProps } from './BasicItem';
import { $fm } from '@/intl';

type HandleChange = React.ComponentProps<typeof Select>['onChange'];

interface SelectItemProps extends BasicItemProps {
  onChange?: HandleChange;
  disabled?: boolean;
  opts?: Array<{ v: string; t?: string; s?: string; access?: AccessType }>;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  opts = [],
  disabled,
  onChange,
  ...rest
}) => {
  return (
    <BasicItem {...rest}>
      <Select onChange={onChange} disabled={disabled}>
        {opts.map((item) => {
          const { v, s, t } = item;
          return (
            <Select.Option value={v} key={v}>
              {s && s}
              {t && $fm(t)}
            </Select.Option>
          );
        })}
      </Select>
    </BasicItem>
  );
};
