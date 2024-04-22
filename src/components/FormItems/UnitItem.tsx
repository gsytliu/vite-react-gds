import { $fm } from '@/intl';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface UnitItemProps {
  children?: React.ReactNode;
  lang?: string;
  label?: string;
  isAccess?: boolean;
  tip?: string;
  name?: string;
  visible?: boolean;
  className?: string;
  shl?: boolean;
}

export const UnitItem: React.FC<UnitItemProps> = ({
  children,
  lang,
  label,
  tip,
  isAccess = true,
  visible = true,
  className,
  shl,
}) => {
  if (!isAccess || !visible) {
    return null;
  }

  const _label = label || (lang ? $fm(lang) : '') || '';
  const _tooltip =
    tip === '' ? '' : (tip && $fm(tip)) || (lang && $fm(lang + '_TT')) || '';

  return (
    <div className={cn(['unit-item', { shl }, className])}>
      <div className='unit-item-label'>
        <label>
          {_label}
          {_tooltip ? (
            <Tooltip title={_tooltip}>
              <QuestionCircleOutlined className='unit-item-tooltip' />
            </Tooltip>
          ) : null}
        </label>
      </div>
      <div className='unit-item-control'>{children}</div>
    </div>
  );
};
