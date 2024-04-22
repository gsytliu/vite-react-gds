import { type MouseEventHandler } from 'react';
import cn from 'classnames';
import './gsicon.less';

import acct from './svgs/acct.svg?react';
import status from './svgs/status.svg?react';
import call from './svgs/call.svg?react';
import arrowDown from './svgs/arrow-down.svg?react';
import arrowLeft from './svgs/arrow-left.svg?react';
import arrowRight from './svgs/arrow-right.svg?react';
import search from './svgs/search.svg?react';
import info from './svgs/info.svg?react';
import successFill from './svgs/success-fill.svg?react';
import warnFill from './svgs/warn-fill.svg?react';
import infoFill from './svgs/info-fill.svg?react';
import errorFill from './svgs/error-fill.svg?react';
import eyeClose from './svgs/eye-close.svg?react';
import eyeOpen from './svgs/eye-open.svg?react';
import userHeader from './svgs/user-header.svg?react';
import lang from './svgs/lang.svg?react';
import reboot from './svgs/reboot.svg?react';

const SVGS = {
  acct,
  status,
  call,
  search,
  info,
  lang,
  reboot,
  'success-fill': successFill,
  'info-fill': infoFill,
  'warn-fill': warnFill,
  'error-fill': errorFill,
  'arrow-down': arrowDown,
  'arrow-left': arrowLeft,
  'arrow-right': arrowRight,
  'eye-close': eyeClose,
  'eye-open': eyeOpen,
  'user-header': userHeader,
};

export type IconTypes = keyof typeof SVGS;

interface GsIconProps {
  type: IconTypes;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler;
}

export const GsIcon: React.FC<GsIconProps> = ({
  type,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const Svg = SVGS[type];

  const _onClick: MouseEventHandler = (e) => {
    if (disabled) {
      return false;
    }
    onClick?.(e);
  };

  return (
    <i
      className={cn(['gsicon', `gsicon-${type}`, className, { disabled }])}
      onClick={_onClick}
      {...props}
    >
      <Svg />
    </i>
  );
};

export default GsIcon;
