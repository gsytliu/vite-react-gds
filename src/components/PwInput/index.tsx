import { forwardRef } from 'react';
import { Input, type InputProps, type InputRef } from 'antd';
import { GsIcon } from '../GsIcon';

/**
 * 此处看似多余的封装是为了后续可能存在的交互行为的改动，比如大写锁定状态
 */

export const PwInput = forwardRef<InputRef, InputProps>((props, ref) => {
  return (
    <Input.Password
      ref={ref}
      {...props}
      iconRender={(visi) => (
        <GsIcon
          style={{
            fontSize: 18,
            marginRight: -3,
            cursor: 'pointer',
            color: '#909399',
          }}
          type={visi ? 'eye-open' : 'eye-close'}
        />
      )}
    ></Input.Password>
  );
});
