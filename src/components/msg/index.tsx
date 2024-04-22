import { message, Modal } from 'antd';
import { GsIcon } from '../GsIcon';
import './msg.less';

message.config({
  maxCount: 1,
});

export const destroyAll = () => {
  Modal.destroyAll();
  message.destroy();
};

export const tsuccess = (
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
) => {
  return message.success({
    className: 'gs-toast',
    icon: <GsIcon type='success-fill' />,
    content,
    duration,
    onClose,
  });
};

export const terror = (
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
) => {
  return message.error({
    className: 'gs-toast',
    icon: <GsIcon type='error-fill' />,
    content,
    duration,
    onClose,
  });
};

export const twarn = (
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
) => {
  return message.warn({
    className: 'gs-toast',
    icon: <GsIcon type='warn-fill' />,
    content,
    duration,
    onClose,
  });
};

export const tinfo = (
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
) => {
  return message.warn({
    className: 'gs-toast',
    icon: <GsIcon type='info-fill' />,
    content,
    duration,
    onClose,
  });
};

export const msuccess: typeof Modal.success = (args) => {
  return Modal.success({
    className: 'gs-msg-modal',
    width: 440,
    centered: true,
    icon: <GsIcon type='success-fill' />,
    transitionName: 'ant-fade',
    ...args,
  });
};

export const merror: typeof Modal.error = (args) => {
  return Modal.error({
    className: 'gs-msg-modal',
    width: 440,
    centered: true,
    icon: <GsIcon type='error-fill' />,
    transitionName: 'ant-fade',
    ...args,
  });
};

export const mwarn: typeof Modal.warn = (args) => {
  return Modal.warning({
    className: 'gs-msg-modal',
    width: 440,
    centered: true,
    icon: <GsIcon type='warn-fill' />,
    transitionName: 'ant-fade',
    ...args,
  });
};

export const minfo: typeof Modal.info = (args) => {
  return Modal.info({
    className: 'gs-msg-modal',
    width: 440,
    centered: true,
    icon: <GsIcon type='info-fill' />,
    transitionName: 'ant-fade',
    ...args,
  });
};

export const mconfirm: typeof Modal.confirm = (args) => {
  return Modal.confirm({
    className: 'gs-msg-modal',
    width: 440,
    centered: true,
    icon: null,
    transitionName: 'ant-fade',
    ...args,
  });
};

export default {
  tsuccess,
  terror,
  twarn,
  tinfo,
  mconfirm,
  mwarn,
  msuccess,
  minfo,
  merror,
};
