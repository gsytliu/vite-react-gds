import { Button } from 'antd';
import { UnitItem } from '../FormItems';
import { StickyBottom } from '../StickyBottom';
import style from './index.module.less';

interface FormBtnProps {
  onOk?: () => void;
  onCancel?: () => void;
}

export const FormBtns: React.FC<FormBtnProps> = (props) => {
  return (
    <StickyBottom className={style['sticky-form-btns']}>
      <UnitItem className={style['form-btns']}>
        <Button type='primary' onClick={props.onOk}>
          保存
        </Button>
        &nbsp;&nbsp;
        <Button onClick={props.onCancel}>取消</Button>
      </UnitItem>
    </StickyBottom>
  );
};
