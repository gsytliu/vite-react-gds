import { Input } from 'antd';
import { BasicItem, type BasicItemProps } from './BasicItem';
import { PwInput } from '../PwInput';

type HandleChange = React.ComponentProps<typeof Input>['onChange'];

interface PwItemProps extends BasicItemProps {
  disabled?: boolean;
  onChange?: HandleChange;
}

export const PwItem: React.FC<PwItemProps> = ({
  onChange,
  disabled,
  ...rest
}) => {
  return (
    <BasicItem {...rest}>
      <PwInput />
    </BasicItem>
  );
};
