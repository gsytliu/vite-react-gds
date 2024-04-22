import { Checkbox } from 'antd';
import { BasicItem, type BasicItemProps } from './BasicItem';

type HandleChange = React.ComponentProps<typeof Checkbox>['onChange'];

interface CheckboxItemProps extends BasicItemProps {
  disabled?: boolean;
  onChange?: HandleChange;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  onChange,
  disabled,
  ...rest
}) => {
  return (
    <BasicItem
      {...rest}
      valuePropName='checked'
      normalize={(value) => Number(value)}
    >
      <Checkbox disabled={disabled} onChange={onChange} />
    </BasicItem>
  );
};
