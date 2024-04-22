import React from 'react';
import { Modal, type ModalProps } from 'antd';
import cn from 'classnames';
import './MiniModal.less';

export interface MiniModalProps extends ModalProps {}

export const MiniModal: React.FC<MiniModalProps> = (props) => {
  const { children, className, onCancel, onOk, ...rest } = props;

  return (
    <Modal
      className={cn(['mini-modal', className])}
      transitionName='ant-fade'
      centered
      onCancel={onCancel}
      onOk={onOk}
      {...rest}
    >
      {children}
    </Modal>
  );
};
