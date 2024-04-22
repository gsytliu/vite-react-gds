import { Checkbox } from 'antd';
import { BasicItem, type BasicItemProps } from './BasicItem';
import { $fm } from '@/intl';

const CheckboxGroup = Checkbox.Group;

type HandleChange = React.ComponentProps<typeof CheckboxGroup>['onChange'];

interface CheckboxGroupItemProps extends BasicItemProps {
  disabled?: boolean;
  onChange?: HandleChange;
  opts?: Array<{ v: string; t?: string; s?: string; access?: AccessType }>;
}

const sortByOptions = (value, options) => {
  const res: any = [];
  options.forEach((item) => {
    if (value.includes(item.v)) {
      res.push(item.v);
    }
  });
  return res;
};

export const CheckboxGroupItem: React.FC<CheckboxGroupItemProps> = ({
  onChange,
  disabled,
  opts = [],
  ...rest
}) => {
  return (
    <BasicItem
      {...rest}
      normalize={(value) => {
        if (typeof value === 'string') {
          value = value.split(',');
        }
        const _value = value || [];
        return sortByOptions(_value, opts).join(',');
      }}
      getValueProps={(value) => {
        return { value: (value || '').split(',') };
      }}
    >
      <CheckboxGroup disabled={disabled} onChange={onChange}>
        {opts.map((item) => (
          <Checkbox value={item.v} key={item.v}>
            {item.t ? $fm(item.t) : item.s}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </BasicItem>
  );
};
