import { Radio } from 'antd';
import { BasicItem, type BasicItemProps } from './BasicItem';
import { $fm } from '@/intl';

const RadioGroup = Radio.Group;

type HandleChange = React.ComponentProps<typeof RadioGroup>['onChange'];

interface RadioGroupItemProps extends BasicItemProps {
  onChange?: HandleChange;
  disabled?: boolean;
  opts?: Array<{ v: string; t?: string; s?: string; access?: AccessType }>;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  opts = [],
  disabled,
  onChange,
  ...rest
}) => {
  return (
    <BasicItem {...rest}>
      <RadioGroup onChange={onChange} disabled={disabled}>
        {opts.map((item) => {
          const { v, s, t } = item;
          return (
            <Radio value={v} key={v}>
              {s && s}
              {t && $fm(t)}
            </Radio>
          );
        })}
      </RadioGroup>
    </BasicItem>
  );
};
