import { Input } from 'antd';
import { BasicItem, type BasicItemProps } from './BasicItem';

type HandleChange = React.ComponentProps<typeof Input>['onChange'];

interface InputItemProps extends BasicItemProps {
  disabled?: boolean;
  onChange?: HandleChange;
}

export const InputItem: React.FC<InputItemProps> = ({
  onChange,
  disabled,
  ...rest
}) => {
  return (
    <BasicItem {...rest}>
      <Input disabled={disabled} onChange={onChange} />
    </BasicItem>
  );
};
